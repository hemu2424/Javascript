import { users } from "../route";

export async function GET(request, { params }) {
  const { id } = await params;

  const user = users.find(
    (u) => u.id === Number(id)
  );

  if (!user) {
    return Response.json(
      { message: "User Not Found" },
      { status: 404 }
    );
  }

  return Response.json(user);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const index = users.findIndex(
    (u) => u.id === Number(id)
  );

  if (index === -1) {
    return Response.json(
      { message: "User Not Found" },
      { status: 404 }
    );
  }

  users[index] = {
    ...users[index],
    ...body,
  };

  return Response.json(users[index]);
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  const index = users.findIndex(
    (u) => u.id === Number(id)
  );

  if (index === -1) {
    return Response.json(
      { message: "User Not Found" },
      { status: 404 }
    );
  }

  users.splice(index, 1);

  return new Response(null, {
    status: 204,
  });
}