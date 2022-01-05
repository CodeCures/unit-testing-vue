import MessageDisplay from "@/components/MessageDisplay.vue";
import { mount } from "@vue/test-utils";
import { getMessage } from "@/services/axios.js";
import flushPromises from "flush-promises";

jest.mock("@/services/axios")

beforeEach(() => {
    jest.clearAllMocks()
})

describe("MessageDisplay", () => {
  it("calls calls getMessage and displays message", async () => {
    const mockMessage = 'Hello from the db!';
    getMessage.mockResolvedValueOnce({ text: mockMessage })
    const wrapper = mount(MessageDisplay);
    // waite for promise to resolve
    await flushPromises()
    // check that call happpens only once
    expect(getMessage).toHaveBeenCalledTimes(1)
    // check that component displays message
    const message = wrapper.find('[data-testid="message"]').element.textContent
    expect(message).toEqual(mockMessage)
  });

  it("Display an eror message when getMessage Fails", async () => {
    // mock the call API
    const mockMessage = 'Oops! Something went wrong.';
    getMessage.mockRejectedValueOnce({ text: mockMessage })
    const wrapper = mount(MessageDisplay);
    // waite for promise to resolve
    await flushPromises()
    // check that call happpens only once
    expect(getMessage).toHaveBeenCalledTimes(1)
    // check that component displays error
    const error = wrapper.find('[data-testid="message-error"]').element.textContent
    expect(error).toEqual(mockMessage)
  });
});
