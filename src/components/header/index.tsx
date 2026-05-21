"use client";

import Image from "next/image";
import { asset } from "@/lib/url";
import ThemeSlider from "@/utils/theme.toggle";
import { useHeaderStore, } from "./store";
import { Text } from "../form/Text";

export default function HeaderLayout() {
  const { data, ui } = useHeaderStore();

  return(
    <div className={ ui.container }>
      <div className={ ui.leftSection }>
        <div className={ ui.mobileMenu }>
          <span className="material-icons text-3xl cursor-pointer" id="headerMobileMenu">
            menu
          </span>
        </div>
        <Image width={192} height={192} src={asset(data.logo)} alt="Logo" className={ ui.logo } id="headerLogo"/>
        <Text variant="head" id="headerTitle" label={ data.title } />
      </div>
      <div className={ ui.rightSection }>
        <ThemeSlider/>
        <button className={ ui.appsView } id="headerAppsView"><span className="material-icons">grid_view</span></button>
        <button className={ ui.profilePic.class } title="User Profile" id="headerProfilePic">
          <Image
            width={ui.profilePic.width} height={ui.profilePic.height}
            src={asset(data.profilePic || "user.png")}
            alt="User"
            className={ui.profilePic.imageClass}
          />
        </button>
      </div>
    </div>
  )
}