"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";
import { Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <header className={theme === "dark" ? "bg-gray-800 shadow-sm" : "bg-white shadow-sm"}>
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Title level={2} className="!mb-0">
                    ByteBoard
                </Title>
                <div className="flex gap-4 items-center">
                    <Text>Welcome, {user?.username}!</Text>
                    <Button
                        icon={<UserOutlined />}
                        onClick={() => router.push(`/profile/${user?.id}`)}
                    >
                        My Profile
                    </Button>
                    <Button onClick={logout}>Logout</Button>
                </div>
            </div>
        </header>
    )
}