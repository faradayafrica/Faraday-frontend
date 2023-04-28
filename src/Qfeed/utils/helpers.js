export default class Helpers {
  static truncateContent(content) {
    return content.slice(1, 219) + "...";
  }
}
