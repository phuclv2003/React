import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { SendMessage, sendMessageSchema } from "../../../schema/chat";
import { useGetProfileQuery } from "../../../services/account";
import { useChatWithAdminQuery } from "../../../services/chat";

const Chat = () => {
  const { data: user } = useGetProfileQuery();
  const { id } = useParams<{ id: string }>();
  const { data: chat, refetch } = useChatWithAdminQuery(Number(id) || 0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");

  const socket = io("http://localhost:8000/chat", {
    auth: {
      token: token,
    },
    path: "/ws/socket.io/",
  });

  useEffect(() => {
    socket?.on("connect_error", (error) => {
      console.log(error);
    });

    socket.on("connect", () => {
      console.log("connected!");
      socket.emit("join_room", 2);
    });

    socket.on("new_message", (data) => {
      console.log("Received");
      refetch();
    });
  }, [refetch, socket]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const formik = useFormik<SendMessage>({
    initialValues: {
      account_id: user?.id || 0,
      message: "",
    },
    validationSchema: sendMessageSchema,
    onSubmit: async (values: SendMessage) => {
      const newValue = { ...values, room: 2 };
      socket.emit("send_message", newValue);
      formik.resetForm();
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    },
  });

  return (
    <>
      <div className="bg-[#f5f5f5] pb-5" style={{ scrollBehavior: "smooth" }}>
        <div className="translate-y-0" style={{ position: "relative" }}>
          <div id="message-list" aria-hidden="true" className="message-list">
            <div
              ref={scrollRef}
              className="mx-3 py-1 flex flex-col-reverse gap-y-3 h-[60vh] overflow-auto"
            >
              {chat?.map((item) => (
                <div key={item.id}>
                  {item.sent_account_id === user?.id ? (
                    <li className="flex justify-start flex-row-reverse w-full">
                      <div className="message-content">
                        <div className="message-reply--content">
                          <div className="message">
                            <div
                              className="message--content"
                              style={{ border: "0px solid transparent" }}
                            >
                              <div
                                data-order="alone"
                                className="message-bubble bg-[#fbfcf8] py-2 px-3 rounded-lg max-w-64"
                              >
                                <div className="message-text break-words text-sm">
                                  <p>{item.message}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li className="flex justify-start">
                      <div className="message-content">
                        <div className="message-reply--content">
                          <div className="message">
                            <div
                              className="message--content"
                              style={{ border: "0px solid transparent" }}
                            >
                              <div
                                data-order="alone"
                                className="message-bubble bg-[#afcdeb] py-2 px-3 rounded-lg w-64"
                              >
                                <div className="message-bubble__inner">
                                  <div
                                    translate="no"
                                    className="message-text break-words text-sm"
                                  >
                                    <p>{item.message}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <form
        id="chatBox"
        className="flex justify-between items-center flex-1 gap-x-5 px-3 pb-5 bg-[#f5f5f5] rounded-b-md"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex-1">
          <input
            autoComplete="off"
            className="w-full h-10 rounded-3xl pl-3 text-sm"
            style={{ boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)" }}
            type="text"
            placeholder="Nhập tin nhắn"
            id="message"
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
        </div>
        <button type="submit" className="bg-[#127ace] w-8 h-8 rounded-full">
          <span
            role="img"
            aria-label="send"
            className="anticon anticon-send send-button"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="send"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill="white"
                d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"
              ></path>
            </svg>
          </span>
        </button>
      </form>
    </>
  );
};

export default Chat;
