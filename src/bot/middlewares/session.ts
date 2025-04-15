export type SessionData = {
    var1: string;
    var2: number;
  };
  
  export const initial = (): SessionData => {
    return {
      var1: '',
      var2: 0,
    };
  };

//Manage your session data here and what you want your session look when it is created for a user you can add more variable here according to need
// YOU CAN ACCESS THIS SESSION DATA THROUGH REDIS AND ctx.session (telegram context)
  