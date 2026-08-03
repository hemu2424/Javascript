export const users = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Himanshu" },
];

export async function GET() {
  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();

  const newUser = {
    id: users.length + 1,
    ...body,
  };

  users.push(newUser);

  return Response.json(newUser, {
    status: 201,
  });
}