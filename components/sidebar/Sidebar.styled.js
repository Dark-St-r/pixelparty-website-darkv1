import tw, { styled } from "twin.macro";

export const Container = styled.div`
  ${tw`flex flex-col w-64 pt-5 border-r border-theme-light bg-theme-dark`}
`;

export const Logo = styled.div`
  ${tw`flex flex-row items-center justify-center flex-shrink-0 px-6`}
`;

export const SidebarContainer = styled.div`
  ${tw`flex flex-col flex-1 h-0 overflow-y-auto`}
`;

export const Profile = styled.div`
  ${tw`relative inline-block px-3 mt-1 text-left`}
`;
export const NavigationButtons = styled.div`
  ${tw`space-y-1`}
`;
export const Frames = styled.div`
  ${tw`mt-8`}
`;
export const Coins = styled.div`
  ${tw`transition mt-2 col-span-2 duration-200 mx-auto flex flex-row w-auto items-center gap-x-3 bg-theme-darker rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-theme-normal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500`}
`;

export const Eggs = styled.div`
  ${tw`transition w-1/2 mt-2 col-span-1 duration-200 mx-auto flex flex-row w-auto items-center gap-x-3 bg-theme-darker rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-theme-normal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500`}
`;
