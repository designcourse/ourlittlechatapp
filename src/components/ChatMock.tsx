"use client";

const imgSendIcon = "/figma-assets/69c24e85d79d3eabfbfab9f689212f27b3490225.svg";

export default function ChatMock() {
  return (
    <div className="bg-[#17191c] box-border content-stretch flex gap-2.5 items-center justify-center p-6 relative w-full h-full" data-name="UI" data-node-id="6:2">
      <div className="bg-[#252b33] box-border content-stretch flex flex-col h-[641px] items-end justify-between overflow-clip px-3 py-6 relative rounded-[16px] shrink-0 w-[410px]" data-name="Chat Container" data-node-id="6:3">
        <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Header" data-node-id="6:16">
          <div className="relative shrink-0 w-[229px] h-[65.512px] flex items-center justify-between" data-name="Inner" data-node-id="6:21">
            <div className="rounded-full bg-[#006dff]" style={{ width: "65.512px", height: "65.512px" }} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden data-name="Expand" data-node-id="6:13">
              <path d="M12.306 16.593L12.271 18.593L5.272 18.471L5.395 11.471L7.395 11.507L7.332 15.092L15.226 7.468L11.694 7.407L11.729 5.407L18.728 5.529L18.605 12.529L16.605 12.493L16.669 8.855L8.721 16.531L12.306 16.593Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-6 h-[416px] items-start justify-start overflow-y-auto p-[12px] relative shrink-0 w-full custom-scrollbar" data-name="Message Container" data-node-id="6:19">
          <div className="content-stretch flex gap-2.5 items-center justify-center relative shrink-0 w-full" data-name="AI Message" data-node-id="6:17">
            <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#b0bed1] text-[16px]" data-node-id="6:6">
              <p className="leading-[1.592]">{`As an AI, I find the intricacies of human interaction fascinating! It's intriguing how emotions and logic intertwine in your conversations. I look forward to learning more about your perspectives!`}</p>
            </div>
          </div>
          <div className="bg-[#006dff] box-border content-stretch flex gap-2.5 items-center justify-center overflow-clip pl-4 pr-1 py-3 relative rounded-[12px] shrink-0 w-full" data-name="User Message" data-node-id="6:8">
            <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white" data-node-id="6:7">
              <p className="leading-[1.592]">{`As an AI, I find the intricacies of human interaction fascinating! It's intriguing how emotions and logic intertwine in your conversations. I look forward to learning more about your perspectives!`}</p>
            </div>
          </div>
          <div className="bg-[#006dff] box-border content-stretch flex gap-2.5 items-center justify-center overflow-clip pl-4 pr-1 py-3 relative rounded-[12px] shrink-0 w-full" data-name="User Message" data-node-id="6:8">
            <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white" data-node-id="6:7">
              <p className="leading-[1.592]">{`As an AI, I find the intricacies of human interaction fascinating! It's intriguing how emotions and logic intertwine in your conversations. I look forward to learning more about your perspectives!`}</p>
            </div>
          </div>
          <div className="bg-[#006dff] box-border content-stretch flex gap-2.5 items-center justify-center overflow-clip pl-4 pr-1 py-3 relative rounded-[12px] shrink-0 w-full" data-name="User Message" data-node-id="6:8">
            <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white" data-node-id="6:7">
              <p className="leading-[1.592]">{`As an AI, I find the intricacies of human interaction fascinating! It's intriguing how emotions and logic intertwine in your conversations. I look forward to learning more about your perspectives!`}</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Response Container" data-node-id="6:18">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="basis-0 bg-[#303843] grow h-[54px] min-h-px min-w-px rounded-[12px] shrink-0 px-4 text-white placeholder-gray-400 border-none outline-none" 
            data-name="Response Textfield" 
            data-node-id="6:9" 
          />
          <div className="bg-[#006dff] box-border content-stretch flex gap-3 items-center justify-center overflow-clip p-[16px] relative rounded-[10px] shrink-0" data-name="Send CTA" data-node-id="6:10">
            <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
              <div className="flex-none rotate-[270deg]">
                <div className="relative size-6" data-name="Send Icon" data-node-id="6:11">
                  <img alt="" className="block max-w-none size-full" src={imgSendIcon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


