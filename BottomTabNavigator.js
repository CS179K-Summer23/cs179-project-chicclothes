import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/Favorites/FavoritesScreen";
import ShoppingBagScreen from "./screens/ShoppingBagScreen";
import ShoppingBagStackNavigator from "./screens/ShoppingBag/ShoppingBagStackNavigator";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import SwipeMeScreen from "./screens/SwipeMeScreen";
import { AntDesign, Fontisto } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          height: 80,
          size: 30,
        },
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "grey",
        headerTitleStyle: {
          color: "grey",
        },
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "red", //change it base on what u what it to be for the bottom icons
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="skin" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Swipe Me"
        component={SwipeMeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="question" color={color} size={size} /> //change icon for this same with shopping bag idk what to put
          ),
        }}
      />
      <Tab.Screen
        name="Catalog"
        component={ShoppingBagStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" color={color} size={size} /> //giving me fucking error for a bag or cart: https://github.com/ant-design/ant-design-icons/issues/227
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
