import {App, Astal, Gdk, Gtk} from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import Gio from "gi://Gio?version=2.0";

const theme = Gtk.IconTheme.get_default();
const iconCache = new Map<string, string | null>();

/*
* Finds the path to the application icon, given the current theme.
* @param client instance of app
* @param size prefered size for icon
* */
let lastCall = 0;

export function GetAppIcon(client: Hyprland.Client, size: number): string | null {
    const now = Date.now();
    print(`Called after ${now - lastCall}ms`);
    lastCall = now;

    // without hashed value for each window
    const app_name: string = client.initial_class.split('._')[0];

    const cacheKey = `${app_name}:${size}`;
    if (iconCache.has(cacheKey)) {
        return iconCache.get(cacheKey)!;
    }


    // finding icon in our theme
    if (theme.has_icon(app_name)) {
        const icon_info = theme.lookup_icon(app_name, size, Gtk.IconLookupFlags.GENERIC_FALLBACK);

        const iconPath = icon_info?.get_filename() ?? null;
        iconCache.set(cacheKey, iconPath);
        return iconPath;
    }

    // getting icon from .desktop entry
    const desktop = Gio.DesktopAppInfo.new(app_name + '.desktop');

    if(desktop != null)
    {
        const iconPath = desktop.get_icon()?.to_string() ?? null;
        iconCache.set(cacheKey, iconPath);
        return iconPath;
    }

    return null;

}