# Documentation
- Class name: ImagesFromBatchSchedule
- Category: FizzNodes 📅🅕🅝/ScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

ImagesFromBatchSchedule节点的'animate'方法旨在根据提供的文本提示和当前帧生成一系列图像，并在指定的最大帧范围内。它处理输入文本以创建一系列提示，并为每个帧选择适当的图像，确保动画果中帧与帧之间的平滑过渡。

# Input types
## Required
- images
    - 'image'参数是节点用来生成动画的图像数据集合。它对节点的操作至关重要，因为它直接影响输出的动画序列。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text
    - 'text'参数包含描述性文本，节点使用该文本来解释和生成动画提示。它非常重要，因为它定义了动画的内容和风格。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- current_frame
    - 'current_frame'参数指定节点当前正在处理的帧。它很重要，因为它决定了为动画选择图像的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- max_frames
    - 'max_frames'参数设置动画中帧数的上限。它很重要，因为它限制了节点生成动画序列的操作范围。
    - Comfy dtype: INT
    - Python dtype: int
- print_output
    - 'print_output'参数是一个标志，当设置为True时，指示节点将输出打印到控制台。这对于调试目的很有用，可以查看动画生成过程的中间结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- selected_images
    - 'selected_images'输出包含为动画的当前帧所选择的图像。这个输出很重要，因为它代表了节点对给定帧操作的视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImagesFromBatchSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'text': ('STRING', {'multiline': True, 'default': defaultPrompt}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 999999.0, 'step': 1.0}), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/ScheduleNodes'

    def animate(self, images, text, current_frame, max_frames, print_output):
        inputText = str('{' + text + '}')
        inputText = re.sub(',\\s*}', '}', inputText)
        start_frame = 0
        animation_prompts = json.loads(inputText.strip())
        (pos_cur_prompt, pos_nxt_prompt, weight) = interpolate_prompt_series(animation_prompts, max_frames, 0, '', '', 0, 0, 0, 0, print_output)
        selImages = selectImages(images, pos_cur_prompt[current_frame])
        return selImages
```