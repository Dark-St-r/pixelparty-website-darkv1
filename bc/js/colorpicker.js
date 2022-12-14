import { StorageManager } from "../../bc/js/localstorage";

export class ColorPalette {

    static color2byte = new Map();
    static byte2color = new Map();
    static currentColor = "#123456";
    static materialIoCols = [];

    static init() {
        this.materialIoCols = this.materialIoCols.concat(['#F44336', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744', '#D50000']);
        this.materialIoCols = this.materialIoCols.concat(['#E91E63', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057', '#C51162'])
        this.materialIoCols = this.materialIoCols.concat(['#9C27B0', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9', '#AA00FF']);
        this.materialIoCols = this.materialIoCols.concat(['#673AB7', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF', '#6200EA']);
        this.materialIoCols = this.materialIoCols.concat(['#3F51B5', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE', '#304FFE']);
        this.materialIoCols = this.materialIoCols.concat(['#2196F3', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF']);
        this.materialIoCols = this.materialIoCols.concat(['#03A9F4', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF', '#0091EA']);
        this.materialIoCols = this.materialIoCols.concat(['#00BCD4', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00ACC1', '#0097A7', '#00838F', '#006064', '#84FFFF', '#18FFFF', '#00E5FF', '#00B8D4']);
        this.materialIoCols = this.materialIoCols.concat(['#009688', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5']);
        this.materialIoCols = this.materialIoCols.concat(['#4CAF50', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676', '#00C853']);
        this.materialIoCols = this.materialIoCols.concat(['#8BC34A', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03', '#64DD17']);
        this.materialIoCols = this.materialIoCols.concat(['#CDDC39', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00']);
        this.materialIoCols = this.materialIoCols.concat(['#FFEB3B', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00', '#FFD600']);
        this.materialIoCols = this.materialIoCols.concat(['#FFC107', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400', '#FFAB00']);
        this.materialIoCols = this.materialIoCols.concat(['#FF9800', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100', '#FF6D00']);
        this.materialIoCols = this.materialIoCols.concat(['#FF5722', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00', '#DD2C00']);
        this.materialIoCols = this.materialIoCols.concat(['#795548', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#9E9E9E', '#FAFAFA', '#EEEEEE', '#E0E0E0']);
        this.materialIoCols = this.materialIoCols.concat(['#BDBDBD', '#616161', '#424242', '#212121', '#607D8B', '#B0BEC5', '#90A4AE', '#78909C', '#607D8C', '#546E7A', '#455A64', '#37474F', '#263238']);
        this.materialIoCols = this.materialIoCols.concat(['#000000', '#FFFFFF']);


        ColorPalette.materialIoCols.forEach((el, index) => {
            ColorPalette.color2byte.set(el.toUpperCase(), index);
        });

        ColorPalette.materialIoCols.forEach((el, index) => {
            ColorPalette.byte2color.set(index, el.toUpperCase());
        });
        ColorPalette.currentColor = StorageManager.getStorageData("colorbucket1", "#F44336");
    }

    static color_byte(hex) {
        return this.color2byte.get(hex.toUpperCase());
    }

    static byte_color(byte) {
        return this.byte2color.get(byte).toString().toUpperCase();
    }

    static rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
    }

    static hex(x) {
        var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
}
