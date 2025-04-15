export const handleMessageWithoutReply = async (ctx: any) => {
  let text = ctx.message.text;
  console.log("text inside without reply...........", text);
  ctx.api.sendMessage(ctx.chat.id, `User send ${text} without reply`);
  //Every message user type without being force reply true will be handled here you can do anything you want use complicated logic to handle messages... sky is the limit , 
};
