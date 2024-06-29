# Documentation
- Class name: IPAdapterPromptScheduleFromWeightsStrategy
- Category: ipadapter/weights
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

这个节点基于权重调度策略，允许用户更好地控制生成文本的过程。通过调整不同阶段的权重，该节点可以帮助生成更符合用户需求的文本内容。

# Input types

## Required

- weights_strategy
    - 权重策略，用于指定生成图像的权重策略。这个参数可以用来控制生成图像的权重策略，以获得更好的效果。
    - Comfy dtype: WEIGHTS_STRATEGY
    - Python dtype: str
- prompt
    - 提示，用于指定生成图像的提示。这个参数可以用来控制生成图像的提示，以获得更好的效果。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt_schedule
    - prompt_schedule输出代表了将指定方法应用于输入权重的结果。它包含了节点目的的精髓，提供了输入数据的合成形式，可以用于进一步的分析或模型训练。
    - Comfy dtype: STRING
    - Python dtype: str


# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterPromptScheduleFromWeightsStrategy():
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "weights_strategy": ("WEIGHTS_STRATEGY",),
            "prompt": ("STRING", {"default": "", "multiline": True }),
            }}

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt_schedule", )
    FUNCTION = "prompt_schedule"
    CATEGORY = "ipadapter/weights"

    def prompt_schedule(self, weights_strategy, prompt=""):
        frames = weights_strategy["frames"]
        add_starting_frames = weights_strategy["add_starting_frames"]
        add_ending_frames = weights_strategy["add_ending_frames"]
        frame_count = weights_strategy["frame_count"]

        out = ""

        prompt = [p for p in prompt.split("\n") if p.strip() != ""]

        if len(prompt) > 0 and frame_count > 0:
            # prompt_pos must be the same size as the image batch
            if len(prompt) > frame_count:
                prompt = prompt[:frame_count]
            elif len(prompt) < frame_count:
                prompt += [prompt[-1]] * (frame_count - len(prompt))

            if add_starting_frames > 0:
                out += f"\"0\": \"{prompt[0]}\",\n"
            for i in range(frame_count):
                out += f"\"{i * frames + add_starting_frames}\": \"{prompt[i]}\",\n"
            if add_ending_frames > 0:
                out += f"\"{frame_count * frames + add_starting_frames}\": \"{prompt[-1]}\",\n"

        return (out, )
```