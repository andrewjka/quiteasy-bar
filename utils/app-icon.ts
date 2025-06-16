import {App, Astal, Gdk, Gtk} from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import Gio from "gi://Gio?version=2.0";

/*
* Finds the path to the application icon, given the current theme.
* @param client instance of app
* @param size prefered size for icon
* */
export function GetAppIcon(client: Hyprland.Client, size: number): Gio.Icon | null {
    const theme = Gtk.IconTheme.get_default();

    // without hashed value for each window
    const app_name: string = client.initial_class.split('._')[0];

    // finding icon in our theme
    if (theme.has_icon(app_name)) {
        const icon_info = theme.lookup_icon(app_name, size, Gtk.IconLookupFlags.GENERIC_FALLBACK);

        return Gio.Icon.new_for_string(icon_info?.get_filename() ?? "");
    }

    // getting icon from .desktop entry
    const desktop = Gio.DesktopAppInfo.new(app_name + '.desktop');

    if (desktop != null) {
        return desktop.get_icon();
    }

    return null;

}