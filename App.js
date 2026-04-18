import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Beli pulsa di depan gang, </Text>
      <Text style={styles.header}> App pertama langsung </Text>
      <Text style={styles.header}> jalan dongg</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Haalooo, I'm Zelfa </Text>
        <Text style={styles.desc}>
          This is my first React Native application built using Expo.
        </Text>
        <Text style={styles.desc}>Learning Mobile Programming is fun! 📱</Text>
      </View>

      <Text style={styles.footer}>PRG6 - Week 1 Practice</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c0336eaf",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
  },

  desc: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 5,
  },

  footer: {
    marginTop: 30,
    color: "white",
    fontSize: 14,
  },
});
