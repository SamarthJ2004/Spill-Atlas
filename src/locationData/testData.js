import Papa from 'papaparse';

const coordGet = async () => {
  let data;
  await fetch('/TEST_for_sam.csv')
    .then(response => response.text())
    .then(text => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          data = results.data; // Access the parsed data here
        },
        error: (error) => {
          console.error('Error parsing file:', error);
        },
      });
    })
    .catch(error => console.error('Error fetching file:', error));

  return data;
}

export default coordGet;