// This is a React component, not an API route!
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10 }
});

const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Hello World</Text>
      </View>
    </Page>
  </Document>
);

// In your React page/component:
<PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
  {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
</PDFDownloadLink>