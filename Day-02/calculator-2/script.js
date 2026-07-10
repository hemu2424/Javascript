/* =========================================================================
   CALCULATOR ENGINE — no eval(), hand-written tokenizer + recursive-descent
   parser + evaluator. Supports: + - * / % ^ (power), unary +/-, decimals,
   nested parentheses, implicit multiplication like "2(3+4)" or "(2)(3)".
   ========================================================================= */

class CalculatorError extends Error {
  constructor(message) {
    super(message);
    this.name = "CalculatorError";
  }
}

/* ---------------------------- 1. TOKENIZER ---------------------------- */
/* Turns a raw string into a flat list of tokens:
   { type: 'number' | 'op' | 'lparen' | 'rparen', value } */

function tokenize(input) {
  const tokens = [];
  let i = 0;
  const src = input.replace(/\s+/g, ""); // ignore whitespace entirely

  const isDigit = (ch) => ch >= "0" && ch <= "9";

  while (i < src.length) {
    const ch = src[i];

    if (isDigit(ch) || ch === ".") {
      // consume a full number literal, guarding against malformed decimals
      let start = i;
      let dotSeen = false;
      while (i < src.length && (isDigit(src[i]) || src[i] === ".")) {
        if (src[i] === ".") {
          if (dotSeen) {
            throw new CalculatorError(`Invalid number: too many decimal points near "${src.slice(start, i + 1)}"`);
          }
          dotSeen = true;
        }
        i++;
      }
      const raw = src.slice(start, i);
      if (raw === ".") {
        throw new CalculatorError("Invalid number: a lone \".\" is not a number");
      }
      tokens.push({ type: "number", value: parseFloat(raw) });
      continue;
    }

    if (ch === "(") {
      tokens.push({ type: "lparen", value: "(" });
      i++;
      continue;
    }

    if (ch === ")") {
      tokens.push({ type: "rparen", value: ")" });
      i++;
      continue;
    }

    if ("+-*/%^".includes(ch)) {
      // normalize the two visual multiply/divide glyphs some UIs use
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }

    if (ch === "×") {
      tokens.push({ type: "op", value: "*" });
      i++;
      continue;
    }

    if (ch === "÷") {
      tokens.push({ type: "op", value: "/" });
      i++;
      continue;
    }

    throw new CalculatorError(`Unexpected character: "${ch}"`);
  }

  return tokens;
}

/* ------------------------- 2. RECURSIVE-DESCENT PARSER + EVALUATOR ------------------------
   Grammar (lowest to highest precedence):

     expression := term (('+' | '-') term)*
     term       := power (('*' | '/' | '%') power)*
     power      := unary ('^' power)?        // right-associative
     unary      := ('+' | '-') unary | postfix
     postfix    := primary
     primary    := NUMBER
                 | '(' expression ')'
                 | primary '(' expression ')'   // implicit multiplication: 2(3+4)

   Division/modulo by zero and empty-expression cases raise CalculatorError.
   ------------------------------------------------------------------------------------------- */

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  peek() {
    return this.tokens[this.pos];
  }

  next() {
    return this.tokens[this.pos++];
  }

  atEnd() {
    return this.pos >= this.tokens.length;
  }

  expectRparen() {
    const tok = this.peek();
    if (!tok || tok.type !== "rparen") {
      throw new CalculatorError("Mismatched parentheses: missing \")\"");
    }
    this.next();
  }

  parse() {
    if (this.tokens.length === 0) {
      throw new CalculatorError("Empty expression");
    }
    const value = this.parseExpression();
    if (!this.atEnd()) {
      const tok = this.peek();
      if (tok.type === "rparen") {
        throw new CalculatorError("Mismatched parentheses: unexpected \")\"");
      }
      throw new CalculatorError(`Unexpected token near "${tok.value}"`);
    }
    return value;
  }

  parseExpression() {
    let value = this.parseTerm();
    while (!this.atEnd() && this.peek().type === "op" && (this.peek().value === "+" || this.peek().value === "-")) {
      const op = this.next().value;
      const rhs = this.parseTerm();
      value = op === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  parseTerm() {
    let value = this.parsePower();
    while (!this.atEnd() && this.peek().type === "op" && ["*", "/", "%"].includes(this.peek().value)) {
      const op = this.next().value;
      const rhs = this.parsePower();
      if (op === "*") {
        value = value * rhs;
      } else if (op === "/") {
        if (rhs === 0) throw new CalculatorError("Division by zero");
        value = value / rhs;
      } else {
        if (rhs === 0) throw new CalculatorError("Modulo by zero");
        value = value % rhs;
      }
    }
    return value;
  }

  parsePower() {
    const base = this.parseUnary();
    if (!this.atEnd() && this.peek().type === "op" && this.peek().value === "^") {
      this.next();
      const exponent = this.parsePower(); // right-associative: 2^3^2 = 2^(3^2)
      const result = Math.pow(base, exponent);
      if (Number.isNaN(result)) {
        throw new CalculatorError("Invalid power operation (e.g. negative base with fractional exponent)");
      }
      return result;
    }
    return base;
  }

  parseUnary() {
    if (!this.atEnd() && this.peek().type === "op" && (this.peek().value === "+" || this.peek().value === "-")) {
      const op = this.next().value;
      const value = this.parseUnary();
      return op === "-" ? -value : value;
    }
    return this.parsePostfix();
  }

  parsePostfix() {
    let value = this.parsePrimary();
    // implicit multiplication: "2(3)" or "(2)(3)" -> chain any immediate '(' after a primary
    while (!this.atEnd() && this.peek().type === "lparen") {
      this.next();
      const rhs = this.parseExpression();
      this.expectRparen();
      value = value * rhs;
    }
    return value;
  }

  parsePrimary() {
    if (this.atEnd()) {
      throw new CalculatorError("Unexpected end of expression");
    }
    const tok = this.peek();

    if (tok.type === "number") {
      this.next();
      return tok.value;
    }

    if (tok.type === "lparen") {
      this.next();
      const value = this.parseExpression();
      this.expectRparen();
      return value;
    }

    if (tok.type === "op") {
      throw new CalculatorError(`Unexpected operator "${tok.value}"`);
    }

    throw new CalculatorError(`Unexpected token "${tok.value}"`);
  }
}

/* ------------------------- 3. PUBLIC EVALUATE FUNCTION ------------------------- */

function evaluateExpression(rawInput) {
  if (typeof rawInput !== "string" || rawInput.trim() === "") {
    throw new CalculatorError("Empty expression");
  }

  // Balance check up front gives a clearer error than deep parser recursion
  let depth = 0;
  for (const ch of rawInput) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (depth < 0) throw new CalculatorError("Mismatched parentheses: unexpected \")\"");
  }
  if (depth > 0) throw new CalculatorError("Mismatched parentheses: missing \")\"");

  const tokens = tokenize(rawInput);
  const parser = new Parser(tokens);
  const result = parser.parse();

  if (!Number.isFinite(result)) {
    throw new CalculatorError("Result is not a finite number");
  }
  return result;
}

/* =========================================================================
   4. UI WIRING
   ========================================================================= */

(function initUI() {
  const exprEl = document.getElementById("expression");
  const resultEl = document.getElementById("result");
  const historyEl = document.getElementById("history-list");
  const keys = document.querySelectorAll(".key");

  let expression = "";
  let justEvaluated = false; // true right after "=" so next digit starts fresh
  let history = [];

  const OPEN = "(";
  const CLOSE = ")";

  function countParenDepth(str) {
    let depth = 0;
    for (const ch of str) {
      if (ch === OPEN) depth++;
      if (ch === CLOSE) depth--;
    }
    return depth;
  }

  function lastChar() {
    return expression.length ? expression[expression.length - 1] : "";
  }

  function isOperatorChar(ch) {
    return ["+", "-", "*", "/", "%", "^"].includes(ch);
  }

  function formatNumber(n) {
    if (!Number.isFinite(n)) return "Error";
    // avoid float noise like 0.1 + 0.2 = 0.30000000000000004
    const rounded = Math.round((n + Number.EPSILON) * 1e12) / 1e12;
    if (Math.abs(rounded) >= 1e15 || (Math.abs(rounded) < 1e-9 && rounded !== 0)) {
      return rounded.toExponential(6).replace(/e\+?/, "e");
    }
    return rounded.toLocaleString("en-US", { maximumFractionDigits: 10 });
  }

  function updateDisplay(previewOnly = true) {
    exprEl.textContent = expression.length ? expression : "0";
    exprEl.classList.remove("error-flash");

    if (expression.trim() === "") {
      resultEl.textContent = "";
      resultEl.classList.remove("is-error");
      return;
    }

    try {
      const value = evaluateExpression(autoCloseParens(expression));
      resultEl.textContent = previewOnly ? formatNumber(value) : formatNumber(value);
      resultEl.classList.remove("is-error");
    } catch (err) {
      if (previewOnly) {
        resultEl.textContent = ""; // stay quiet while mid-typing
        resultEl.classList.remove("is-error");
      } else {
        resultEl.textContent = err.message;
        resultEl.classList.add("is-error");
      }
    }
  }

  function autoCloseParens(str) {
    const depth = countParenDepth(str);
    return depth > 0 ? str + CLOSE.repeat(depth) : str;
  }

  function appendToken(token) {
    if (justEvaluated) {
      // if user starts typing a digit/paren after "=", start a new expression;
      // if they start with an operator, continue chaining from the last result
      if (isOperatorChar(token)) {
        justEvaluated = false;
      } else {
        expression = "";
        justEvaluated = false;
      }
    }

    const last = lastChar();

    if (isOperatorChar(token)) {
      if (expression === "" && token !== "-") {
        return; // can't start with *, /, %, ^ (unary minus is allowed)
      }
      if (isOperatorChar(last)) {
        // replace the previous operator instead of stacking "5+*3"
        // but allow "5*-3" (unary minus after an operator)
        if (token === "-" && last !== "-") {
          expression += token;
        } else {
          expression = expression.slice(0, -1) + token;
        }
        updateDisplay(true);
        return;
      }
      if (last === OPEN && token !== "-") {
        return; // no "(*3"
      }
      expression += token;
      updateDisplay(true);
      return;
    }

    if (token === ".") {
      // find the current number segment (after last operator/paren) and block a 2nd dot
      const segment = expression.split(/[+\-*/%^(]/).pop();
      if (segment.includes(".")) return;
      if (segment === "") expression += "0";
      expression += ".";
      updateDisplay(true);
      return;
    }

    if (token === OPEN) {
      if (/[0-9)]$/.test(last)) {
        expression += "*("; // implicit multiplication when opening right after a number/")"
      } else {
        expression += OPEN;
      }
      updateDisplay(true);
      return;
    }

    if (token === CLOSE) {
      const depth = countParenDepth(expression);
      if (depth <= 0) return; // no unmatched closer
      if (last === "" || last === OPEN || isOperatorChar(last)) return;
      expression += CLOSE;
      updateDisplay(true);
      return;
    }

    // digit
    if (last === "0" && /(^|[+\-*/%^(])0$/.test(expression)) {
      // replace a lone leading zero in the current segment, e.g. "0" -> "5" not "05"
      expression = expression.slice(0, -1) + token;
    } else {
      expression += token;
    }
    updateDisplay(true);
  }

  function backspace() {
    if (justEvaluated) {
      clearAll();
      return;
    }
    expression = expression.slice(0, -1);
    updateDisplay(true);
  }

  function clearAll() {
    expression = "";
    justEvaluated = false;
    resultEl.classList.remove("is-error");
    updateDisplay(true);
  }

  function evaluate() {
    if (expression.trim() === "") return;
    const closed = autoCloseParens(expression);
    try {
      const value = evaluateExpression(closed);
      const formatted = formatNumber(value);
      pushHistory(expression, formatted);
      expression = formatted.replace(/,/g, "");
      resultEl.textContent = "";
      exprEl.textContent = expression;
      justEvaluated = true;
    } catch (err) {
      exprEl.classList.add("error-flash");
      resultEl.textContent = err.message;
      resultEl.classList.add("is-error");
      justEvaluated = false;
    }
  }

  function pushHistory(expr, result) {
    history.unshift({ expr, result });
    history = history.slice(0, 8);
    renderHistory();
  }

  function renderHistory() {
    historyEl.innerHTML = "";
    if (history.length === 0) {
      const empty = document.createElement("li");
      empty.className = "history-empty";
      empty.textContent = "No calculations yet";
      historyEl.appendChild(empty);
      return;
    }
    for (const item of history) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="h-expr">${item.expr} =</span><span class="h-result">${item.result}</span>`;
      li.addEventListener("click", () => {
        expression = item.result.replace(/,/g, "");
        justEvaluated = true;
        updateDisplay(true);
      });
      historyEl.appendChild(li);
    }
  }

  /* ---- button clicks ---- */
  keys.forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const value = btn.dataset.value;

      if (action === "clear") return clearAll();
      if (action === "back") return backspace();
      if (action === "equals") return evaluate();
      if (value) return appendToken(value);
    });
  });

  /* ---- keyboard support ---- */
  window.addEventListener("keydown", (e) => {
    const key = e.key;
    if (/[0-9]/.test(key)) return appendToken(key);
    if ("+-*/%^().".includes(key)) return appendToken(key);
    if (key === "Enter" || key === "=") {
      e.preventDefault();
      return evaluate();
    }
    if (key === "Backspace") return backspace();
    if (key === "Escape") return clearAll();
  });

  renderHistory();
  updateDisplay(true);
})();

/* Exposed for potential unit testing in a console/environment */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { evaluateExpression, tokenize, Parser, CalculatorError };
}