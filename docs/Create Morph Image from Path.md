
# Documentation
- Class name: Create Morph Image from Path
- Category: WAS Suite/Animation
- Output node: False

该节点旨在生成一系列存储在指定目录中的图像之间的变形动画。它创建一个GIF动画，在给定数量的帧之间平滑地从一个图像过渡到另一个图像，允许自定义过渡速度、循环次数和输出大小。该节点通过自动化变形过程来促进动态视觉内容的创建。

# Input types
## Required
- transition_frames
    - 指定用于每对图像之间过渡的帧数，影响变形动画的平滑度。
    - Comfy dtype: INT
    - Python dtype: int
- still_image_delay_ms
    - 确定每个静止图像在过渡前的延迟毫秒数，允许在序列中的每个图像上暂停。
    - Comfy dtype: FLOAT
    - Python dtype: int
- duration_ms
    - 设置动画中每帧的持续时间（毫秒），控制变形效果的速度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- loops
    - 定义动画将循环多少次，0表示无限循环。
    - Comfy dtype: INT
    - Python dtype: int
- max_size
    - 限制动画中图像的最大尺寸，确保输出文件保持在可管理的大小范围内。
    - Comfy dtype: INT
    - Python dtype: int
- input_path
    - 存储输入图像的目录路径，作为变形动画的源。
    - Comfy dtype: STRING
    - Python dtype: str
- input_pattern
    - 用于匹配输入目录中文件名的模式，允许选择性地包含动画中的图像。
    - Comfy dtype: STRING
    - Python dtype: str
- output_path
    - 生成的GIF动画将被保存的目录路径。
    - Comfy dtype: STRING
    - Python dtype: str
- filename
    - 输出文件的名称，不包括扩展名，允许自定义输出文件名。
    - Comfy dtype: STRING
    - Python dtype: str
- filetype
    - 指定输出动画的文件类型，通常设置为'GIF'以与大多数查看器兼容。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- filepath_text
    - 保存的输出文件的绝对路径，提供生成动画的直接链接。
    - Comfy dtype: STRING
    - Python dtype: str
- filename_text
    - 保存的输出文件的名称，包括其扩展名，为生成的动画提供清晰的标识符。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Morph_GIF_By_Path:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "transition_frames": ("INT", {"default":30, "min":2, "max":60, "step":1}),
                "still_image_delay_ms": ("FLOAT", {"default":2500.0, "min":0.1, "max":60000.0, "step":0.1}),
                "duration_ms": ("FLOAT", {"default":0.1, "min":0.1, "max":60000.0, "step":0.1}),
                "loops": ("INT", {"default":0, "min":0, "max":100, "step":1}),
                "max_size": ("INT", {"default":512, "min":128, "max":1280, "step":1}),
                "input_path": ("STRING",{"default":"./ComfyUI", "multiline": False}),
                "input_pattern": ("STRING",{"default":"*", "multiline": False}),
                "output_path": ("STRING", {"default": "./ComfyUI/output", "multiline": False}),
                "filename": ("STRING", {"default": "morph", "multiline": False}),
                "filetype": (["GIF", "APNG"],),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    RETURN_TYPES = (TEXT_TYPE,TEXT_TYPE)
    RETURN_NAMES = ("filepath_text","filename_text")
    FUNCTION = "create_morph_gif"

    CATEGORY = "WAS Suite/Animation"

    def create_morph_gif(self, transition_frames=30, still_image_delay_ms=2500, duration_ms=0.1, loops=0, max_size=512,
                            input_path="./ComfyUI/output", input_pattern="*", output_path="./ComfyUI/output", filename="morph", filetype="GIF"):

        if 'imageio' not in packages():
            install_package("imageio")

        if not os.path.exists(input_path):
            cstr(f"The input_path `{input_path}` does not exist!").error.print()
            return ("",)

        images = self.load_images(input_path, input_pattern)
        if not images:
            cstr(f"The input_path `{input_path}` does not contain any valid images!").msg.print()
            return ("",)

        if filetype not in ["APNG", "GIF"]:
            filetype = "GIF"
        if output_path.strip() in [None, "", "."]:
            output_path = "./ComfyUI/output"

        if transition_frames < 2:
            transition_frames = 2
        elif transition_frames > 60:
            transition_frames = 60

        if duration_ms < 0.1:
            duration_ms = 0.1
        elif duration_ms > 60000.0:
            duration_ms = 60000.0

        tokens = TextTokens()
        WTools = WAS_Tools_Class()

        output_file = WTools.morph_images(images, steps=int(transition_frames), max_size=int(max_size), loop=int(loops), still_duration=int(still_image_delay_ms),
                                            duration=int(duration_ms), output_path=tokens.parseTokens(os.path.join(*output_path.split('/'))),
                                            filename=tokens.parseTokens(filename), filetype=filetype)

        return (output_file,filename)


    def load_images(self, directory_path, pattern):
        images = []
        for file_name in glob.glob(os.path.join(directory_path, pattern), recursive=False):
            if file_name.lower().endswith(ALLOWED_EXT):
                images.append(Image.open(file_name).convert("RGB"))
        return images

```
