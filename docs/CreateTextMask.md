
# Documentation
- Class name: CreateTextMask
- Category: KJNodes/text
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CreateTextMask节点用于生成基于文本的图像及其对应的蒙版。它支持多种字体，并通过旋转参数实现动画效果，能够为各种应用创建动态文本视觉效果。

# Input types
## Required
- invert
    - 决定是否反转生成的文本图像和蒙版的颜色，影响视觉对比度和风格。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- frames
    - 指定要生成的帧数，如果使用多于一帧，可以创建动画序列。
    - Comfy dtype: INT
    - Python dtype: int
- text_x
    - 设置文本在图像中的水平位置，实现精确定位。
    - Comfy dtype: INT
    - Python dtype: int
- text_y
    - 设置文本在图像中的垂直位置，允许调整垂直对齐。
    - Comfy dtype: INT
    - Python dtype: int
- font_size
    - 控制文本使用的字体大小，影响文本的可读性和视觉冲击力。
    - Comfy dtype: INT
    - Python dtype: int
- font_color
    - 定义文本的颜色，为文本外观提供自定义选项。
    - Comfy dtype: STRING
    - Python dtype: str
- text
    - 要在图像中渲染的文本内容，作为主要视觉元素。
    - Comfy dtype: STRING
    - Python dtype: str
- font
    - 选择用于文本的字体，提供一系列风格选择。字体列表根据指定目录中可用的字体动态生成。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- width
    - 确定生成图像的宽度，定义画布大小。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 确定生成图像的高度，定义画布大小。
    - Comfy dtype: INT
    - Python dtype: int
- start_rotation
    - 设置文本的起始旋转角度，与end_rotation结合使用可实现旋转动画效果。
    - Comfy dtype: INT
    - Python dtype: int
- end_rotation
    - 设置文本的结束旋转角度，用于创建旋转动画效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 节点生成的基于文本的图像，可直接使用或进一步处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 与文本图像一起生成的蒙版，用于进一步的图像处理或效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CreateTextMask:

    RETURN_TYPES = ("IMAGE", "MASK",)
    FUNCTION = "createtextmask"
    CATEGORY = "KJNodes/text"
    DESCRIPTION = """
Creates a text image and mask.  
Looks for fonts from this folder:  
ComfyUI/custom_nodes/ComfyUI-KJNodes/fonts
  
If start_rotation and/or end_rotation are different values,  
creates animation between them.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "invert": ("BOOLEAN", {"default": False}),
                 "frames": ("INT", {"default": 1,"min": 1, "max": 4096, "step": 1}),
                 "text_x": ("INT", {"default": 0,"min": 0, "max": 4096, "step": 1}),
                 "text_y": ("INT", {"default": 0,"min": 0, "max": 4096, "step": 1}),
                 "font_size": ("INT", {"default": 32,"min": 8, "max": 4096, "step": 1}),
                 "font_color": ("STRING", {"default": "white"}),
                 "text": ("STRING", {"default": "HELLO!", "multiline": True}),
                 "font": (folder_paths.get_filename_list("kjnodes_fonts"), ),
                 "width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                 "height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                 "start_rotation": ("INT", {"default": 0,"min": 0, "max": 359, "step": 1}),
                 "end_rotation": ("INT", {"default": 0,"min": -359, "max": 359, "step": 1}),
        },
    } 

    def createtextmask(self, frames, width, height, invert, text_x, text_y, text, font_size, font_color, font, start_rotation, end_rotation):
    # Define the number of images in the batch
        batch_size = frames
        out = []
        masks = []
        rotation = start_rotation
        if start_rotation != end_rotation:
            rotation_increment = (end_rotation - start_rotation) / (batch_size - 1)

        font_path = folder_paths.get_full_path("kjnodes_fonts", font)
        # Generate the text
        for i in range(batch_size):
            image = Image.new("RGB", (width, height), "black")
            draw = ImageDraw.Draw(image)
            font = ImageFont.truetype(font_path, font_size)
            
            # Split the text into words
            words = text.split()
            
            # Initialize variables for line creation
            lines = []
            current_line = []
            current_line_width = 0
            try: #new pillow  
                # Iterate through words to create lines
                for word in words:
                    word_width = font.getbbox(word)[2]
                    if current_line_width + word_width <= width - 2 * text_x:
                        current_line.append(word)
                        current_line_width += word_width + font.getbbox(" ")[2] # Add space width
                    else:
                        lines.append(" ".join(current_line))
                        current_line = [word]
                        current_line_width = word_width
            except: #old pillow             
                for word in words:
                    word_width = font.getsize(word)[0]
                    if current_line_width + word_width <= width - 2 * text_x:
                        current_line.append(word)
                        current_line_width += word_width + font.getsize(" ")[0] # Add space width
                    else:
                        lines.append(" ".join(current_line))
                        current_line = [word]
                        current_line_width = word_width
            
            # Add the last line if it's not empty
            if current_line:
                lines.append(" ".join(current_line))
            
            # Draw each line of text separately
            y_offset = text_y
            for line in lines:
                text_width = font.getlength(line)
                text_height = font_size
                text_center_x = text_x + text_width / 2
                text_center_y = y_offset + text_height / 2
                try:
                    draw.text((text_x, y_offset), line, font=font, fill=font_color, features=['-liga'])
                except:
                    draw.text((text_x, y_offset), line, font=font, fill=font_color)
                y_offset += text_height # Move to the next line
            
            if start_rotation != end_rotation:
                image = image.rotate(rotation, center=(text_center_x, text_center_y))
                rotation += rotation_increment
            
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            mask = image[:, :, :, 0] 
            masks.append(mask)
            out.append(image)
            
        if invert:
            return (1.0 - torch.cat(out, dim=0), 1.0 - torch.cat(masks, dim=0),)
        return (torch.cat(out, dim=0),torch.cat(masks, dim=0),)

```
