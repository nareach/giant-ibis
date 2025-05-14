// app/api/send/MyDocument.js
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>Hello World!</Text>
        <Text style={styles.text}>This is a properly generated PDF document</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;