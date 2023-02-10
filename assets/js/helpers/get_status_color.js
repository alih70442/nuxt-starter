function get_status_color(status_id) {
  status_id = status_id?.toString();
  switch (status_id) {
    case "1010": return 'red';
    case "1020": return 'orange';
    case "1030": return '#2196f3';
    case "1040": return '#08c43d';
    case "1050": return 'red';
    case "1060": return 'orange';
    case "1070": return '#08c43d';
    case "1080": return '#2196f3';
    case "1090": return '#2196f3';
    case "10100": return 'red';
  }
}

export default get_status_color;
