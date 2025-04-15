export const createCommanMenu = async (bot: any) => {
    try {
      await bot.api.setMyCommands([
        { command: "start", description: "View trades and open main menu" },
        { command: "settings", description: "Manage settings" },
        //Make sure the menu you create handle what this menu does in welcome.ts which handle commands and all these are basically commands
      ]);
    } catch (error) {
      console.log(error)
    }
  };