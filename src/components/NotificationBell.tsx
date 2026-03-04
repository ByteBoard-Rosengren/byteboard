"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge, Popover, List, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { fetchNotifications, markNotificationRead } from "@/lib/api";
import { useStore } from "@/store/useStore";

const { Text } = Typography;

export default function NotificationBell() {
    const router = useRouter();
    const { notifications, setNotifications, markNotificationRead: markReadLocally } = useStore();

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const response = await fetchNotifications();
                setNotifications(response.data || []);
            } catch (error) {
                console.error("Failed to fetch notifications:", error)
            }
        };

        loadNotifications();
    }, [setNotifications]);

    const handleNotificationClick = async (notificationId: number, postId: number) => {
        try {
            await markNotificationRead(notificationId);
            markReadLocally(notificationId);
        } catch (error) {
            console.error("Failed to mark notification as read:", error)
        }
        router.push(`/posts/${postId}`);
    };

    const hasUnread = notifications.some((n) => !n.is_read);

    const dropdownContent = (
        <div className="bg-white dark:bg-gray-800 rounded shadow-lg w-80 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
                <div className="p-4">
                    <Text type="secondary">No notifications</Text>
                </div>
            ) : (
                <List
                    dataSource={notifications}
                    renderItem={(notif) => (
                        <List.Item
                            key={notif.notification_id}
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-4"
                            onClick={() => handleNotificationClick(notif.notification_id, notif.post_id)}
                        >
                            <div className="flex items-center gap-2 w-full">
                                {!notif.is_read && (
                                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                )}
                                <Text className={!notif.is_read ? "font-semibold" : ""}>{notif.message}</Text>
                            </div>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );

    return (
        <Popover content={dropdownContent} trigger="click" placement="bottomRight">
            <Badge dot={hasUnread} color="red" offset={[-2, 2]}>
                <BellOutlined className="text-xl cursor-pointer" />
            </Badge>
        </Popover>
    )
}