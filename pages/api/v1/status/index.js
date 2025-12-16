function status(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.status(200).json({ message: "A API está funcionando!" });
  //response.status(200).send("A API está funcionando!");
  //send não consegue manipular charset.
}

export default status;
