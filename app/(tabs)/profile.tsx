import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProfileOptionCard from '@/components/Cards/ProfileOptionCard';
import COLORS from '@/constants/Colors';
import FONTS from '@/constants/Fonts';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useAuthStore from '../Store/authStore';
import CustomLoader from '@/components/Loader/CustomLoader';
import LogOut from '../(auth)/login';

const Profile = () => {
  const route = useRouter()
const user = useAuthStore((state) => state.user);
const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
const hydrate = useAuthStore.getState().hydrate; 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      await hydrate();
      setLoading(false);
    };
    loadUser();
  }, []);

  if (loading) {
    return <CustomLoader/>;
  }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />

      {isLoggedIn ? (
  <View>
    <Text style={styles.name}>{user?.name}</Text>
    <Text style={styles.email}>{user?.email}</Text>
  </View>
) : null}
       
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.sectionTitle}>Saved Addresses</Text>
      <ProfileOptionCard
        icon="location-outline"
        title="Manage Addresses"
        iconColor={COLORS.PRIMARY}
        onPress={() => {}}
      />

      <Text style={styles.sectionTitle}>Orders</Text>
      <ProfileOptionCard
        icon="fast-food-outline"
        title="Order History"
        iconColor={COLORS.PRIMARY}
        onPress={() => {}}
      />

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>Payment</Text>
      <ProfileOptionCard
        icon="card-outline"
        title="Payment Methods"
        iconColor={COLORS.PRIMARY}
        onPress={() => {}}
      />

      {/* Preferences & Settings */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      <ProfileOptionCard
        icon="leaf-outline"
        title="Dietary Preferences"
        iconColor={COLORS.SECONDARY}
        onPress={() => {}}
      />
      <ProfileOptionCard
        icon="globe-outline"
        title="Language & Region"
        iconColor={COLORS.SECONDARY}
        onPress={() => {}}
      />
      <ProfileOptionCard
        icon="notifications-outline"
        title="Notification Settings"
        iconColor={COLORS.SECONDARY}
        onPress={() => {}}
      />

      {/* Rewards & Loyalty */}
      <Text style={styles.sectionTitle}>Rewards</Text>
      <ProfileOptionCard
        icon="gift-outline"
        title="Loyalty Points & Rewards"
        iconColor={COLORS.ACCENT}
        onPress={() => {}}
      />
      <ProfileOptionCard
        icon="share-social-outline"
        title="Refer a Friend"
        iconColor={COLORS.ACCENT}
        onPress={() => {}}
      />

      {/* Support & Help */}
      <Text style={styles.sectionTitle}>Support</Text>
      <ProfileOptionCard
        icon="help-circle-outline"
        title="Help Center / FAQs"
        iconColor={COLORS.INFO}
        onPress={() => {}}
      />
      <ProfileOptionCard
        icon="chatbox-ellipses-outline"
        title="Contact Support"
        iconColor={COLORS.INFO}
        onPress={() => {}}
      />


      <Text style={styles.sectionTitle}>Security</Text>
      <ProfileOptionCard
        icon="lock-closed-outline"
        title="Change Password"
        iconColor={COLORS.ERROR}
        onPress={() => {}}
      />
      <ProfileOptionCard
        icon="finger-print-outline"
        title="Biometric Login"
        iconColor={COLORS.ERROR}
        onPress={() => {}}
      />
      <ProfileOptionCard 
        icon="log-out-outline"
        title="Logout"
        iconColor={COLORS.ERROR}
   onPress={LogOut
  }
      />
      <ProfileOptionCard
        icon="trash-outline"
        title="Delete Account"
        iconColor={COLORS.ERROR}
        onPress={() => {}}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,

    marginBottom: 16,
    borderRadius: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.TEXT_PRIMARY,
    textAlign:"center"
  },
  email: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    fontFamily: FONTS.POPPINS_REGULAR,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 14,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
});
