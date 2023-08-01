import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ShoppingBagScreen from "./screens/ShoppingBagScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RandomFeatureScreen from "./screens/RandomFeatureScreen";
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
          color : "grey",
        },
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "#013220",
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
        name="ShoppingBag"
        component={ShoppingBagScreen}
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
       <Tab.Screen
        name="XFeature"
        component={RandomFeatureScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="question" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;