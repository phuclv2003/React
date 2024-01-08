import { useFormik } from "formik";
import React, { FC, useEffect, useRef } from "react";
import "../../../assets/css/common.css";
import { SendMessage, sendMessageSchema } from "../../../schema/chat";
import { useGetProfileQuery } from "../../../services/account";
import {
  useChatWithAdminQuery,
  useSendMessageMutation,
} from "../../../services/chat";

type TModalChat = {
  openModalChat: boolean;
  setOpenModalChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalChat: FC<TModalChat> = ({ openModalChat, setOpenModalChat }) => {
  const { data: user } = useGetProfileQuery();
  const { data: chat, refetch } = useChatWithAdminQuery(user?.id || 0);
  const [sendChat] = useSendMessageMutation();
  const scrollRef = useRef<HTMLDivElement>(null);

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
      try {
        const res = await sendChat(values);
        if ("data" in res) {
          formik.resetForm();
          refetch();
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }
      } catch (error) {
        console.error("Lỗi", error);
      }
    },
  });

  return (
    <>
      {openModalChat && (
        <div
          className="fixed bottom-10 right-5"
          style={{ boxShadow: "0 7px 16px 0 rgba(0, 0, 0, 0.1)" }}
        >
          <header className="flex justify-between items-center w-96 bg-[#0f67ad] px-2 h-14 rounded-t-md">
            <span
              role="img"
              aria-label="user"
              className="anticon anticon-user"
              style={{
                color: "rgb(140, 140, 140)",
                backgroundColor: "rgb(255, 255, 255)",
                fontSize: "16px",
                padding: "8px",
                borderRadius: "50%",
              }}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="user"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
              </svg>
            </span>
            <div className="livechat-header__content">
              <div className="text-white">Nhà Thuốc FPT Long Châu</div>
            </div>
            <div className="livechat-header__subtitle">
              <div style={{ position: "relative", display: "flex" }}>
                <span
                  role="img"
                  aria-label="more"
                  tabIndex={-1}
                  className="anticon anticon-more expandBtn"
                  style={{
                    fontSize: "26px",
                    cursor: "pointer",
                    color: "rgb(23, 92, 196)",
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "50%",
                    transform: "rotate(90deg)",
                    marginRight: "10px",
                  }}
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="more"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                  </svg>
                </span>
                <span
                  onClick={() => setOpenModalChat(false)}
                  role="img"
                  aria-label="minus"
                  tabIndex={-1}
                  className="anticon anticon-minus"
                  style={{
                    fontSize: "26px",
                    cursor: "pointer",
                    color: "rgb(23, 92, 196)",
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "50%",
                  }}
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="minus"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </header>
          <div className="bg-[#f5f5f5]" style={{ scrollBehavior: "smooth" }}>
            <div className="translate-y-0" style={{ position: "relative" }}>
              <div
                id="message-list"
                aria-hidden="true"
                className="message-list"
              >
                <div
                  ref={scrollRef}
                  className="mx-3 py-1 flex flex-col-reverse gap-y-3 max-h-96 overflow-auto"
                >
                  {chat?.map((item) => (
                    <div key={item.id}>
                      {item.account_id === user?.id ? (
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
        </div>
      )}
    </>
  );
};

export default ModalChat;
