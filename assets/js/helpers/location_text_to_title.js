function location_text_to_title(locations) {
  for (const location of locations) {
    if (!location.title) {
      location.title = location.address ?? 'نامی برای این آدرس انتخاب نشده است.';
    }
  }
  return locations;
}

export default location_text_to_title;
