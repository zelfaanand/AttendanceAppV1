import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Data awal (Initial State) diletakkan di luar komponen
const initialHistory = [
  { id: "1", course: "Web Programming", date: "2026-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
];

const Home = () => {
  // 1. STATE UNTUK RIWAYAT PRESENSI
  const [historyData, setHistoryData] = useState(initialHistory);

  // 2. STATE UNTUK STATUS TOMBOL CHECK-IN
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // 3. STATE UNTUK JAM DIGITAL [cite: 94]
  const [currentTime, setCurrentTime] = useState("Memuat jam...");
  // Langkah 3: useEffect untuk Jam Real-time
  useEffect(() => {
    // Jalankan timer setiap 1000 milidetik (1 detik)
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    }, 1000);

    // CLEANUP: Matikan timer jika layar ditutup untuk mencegah kebocoran memori
    return () => clearInterval(timer);
  }, []); // Array kosong agar hanya jalan satu kali saat mounting

  // Langkah 4: Logika Tombol Check-In
  const handleCheckIn = () => {
    if (isCheckedIn) {
      Alert.alert(
        "Perhatian",
        "Anda sudah melakukan Check In untuk kelas ini.",
      );
      return;
    }

    // 1. Buat data presensi baru
    const newAttendance = {
      id: Date.now().toString(), // ID unik dari timestamp
      course: "Mobile Programming",
      date: new Date().toLocaleDateString("id-ID"), // Tanggal hari ini
      status: "Present",
    };

    // 2. Masukkan data baru ke urutan paling atas
    setHistoryData([newAttendance, ...historyData]);

    // 3. Kunci tombol Check In
    setIsCheckedIn(true);
    Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
  };

  // Fungsi Render untuk FlatList
  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyCourse}>{item.course}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <Text
        style={[
          styles.statusText,
          item.status === "Present"
            ? styles.statusPresent
            : styles.statusAbsent,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header dengan Jam Digital */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        {/* Student Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>
          <View>
            <Text style={styles.name}>Ananda Zelfa Syahira</Text>
            <Text>NIM: 0320240010</Text>
            <Text>Class: Informatika-2C</Text>
          </View>
        </View>

        {/* Today's Class Card */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text style={styles.courseTitle}>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab Programming 6</Text>

          {/* Tombol Check In Dinamis */}
          <TouchableOpacity
            style={[
              styles.button,
              isCheckedIn ? styles.buttonDisabled : styles.buttonActive,
            ]}
            onPress={handleCheckIn}
            disabled={isCheckedIn} // Matikan klik jika sudah absen
          >
            <Text style={styles.buttonText}>
              {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Attendance History */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Attendance History</Text>
          <FlatList
            data={historyData} // Menggunakan state historyData
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false} // Scroll ditangani oleh ScrollView utama
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  clockText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    fontVariant: ["tabular-nums"],
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#eee",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  classCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  courseTitle: { fontSize: 16, fontWeight: "600" },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonActive: { backgroundColor: "#007AFF" },
  buttonDisabled: { backgroundColor: "#ABC4FF" },
  buttonText: { color: "white", fontWeight: "bold" },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  historyCourse: { fontWeight: "600" },
  historyDate: { fontSize: 12, color: "#666" },
  statusText: { fontWeight: "bold" },
  statusPresent: { color: "green" },
  statusAbsent: { color: "red" },
});

export default Home;
