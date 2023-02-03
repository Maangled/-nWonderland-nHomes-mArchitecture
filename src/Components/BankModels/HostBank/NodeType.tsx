  // getNodeProfiles will load the profiles of the nodes that are connected to the host by using the Moralis.Cloud.run function "getNodeProfiles" and create a list of the profiles
  export type Node = {
    id: any;
    type?: string;
    name: string;
    description?: string;
    version?: string;
    author?: string;
    license?: string;
    dependencies?: {
      os?: string;
      path?: string;
      fs?: string;
      crypto?: string[];
      ip?: any; uuid: any;
    };
    data?: any;
  };