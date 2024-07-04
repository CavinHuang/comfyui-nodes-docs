
# Documentation
- Class name: AddLabel
- Category: KJNodes/text
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AddLabel节点用于向图像添加文本标签，允许自定义文本位置、大小、颜色以及标签的背景色。它支持单张和批量处理，能够为批量图像处理多个标题。

# Input types
## Required
- image
    - 需要添加标签的输入图像。这是添加标签的主要画布。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text_x
    - 文本在图像上的起始点x坐标。它决定了文本在水平方向上的起始位置。
    - Comfy dtype: INT
    - Python dtype: int
- text_y
    - 文本在图像上的起始点y坐标。它决定了文本在垂直方向上的起始位置。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 要添加到图像的标签区域的高度。它影响最终图像的整体高度。
    - Comfy dtype: INT
    - Python dtype: int
- font_size
    - 用于标签文本的字体大小。这决定了文本在标签上显示的大小。
    - Comfy dtype: INT
    - Python dtype: int
- font_color
    - 用于标签文本的字体颜色。它定义了文本的视觉外观。
    - Comfy dtype: STRING
    - Python dtype: str
- label_color
    - 标签区域的背景颜色。这种颜色将填充文本标签的背景。
    - Comfy dtype: STRING
    - Python dtype: str
- font
    - 用于标签文本的字体。该参数允许选择不同的字体样式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- text
    - 要作为标签添加到图像上的文本内容。这是实际的标签文本。
    - Comfy dtype: STRING
    - Python dtype: str
- direction
    - 标签将被添加到图像的方向，可以是上方（up）或下方（down）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- caption
    - 用于批处理的可选标题。提供时，批次中的每个图像都将有其对应的标题作为标签。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Output types
- image
    - 添加了标签的输出图像。这个图像包括原始内容加上新添加的标签区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AddLabel:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image":("IMAGE",),  
            "text_x": ("INT", {"default": 10, "min": 0, "max": 4096, "step": 1}),
            "text_y": ("INT", {"default": 2, "min": 0, "max": 4096, "step": 1}),
            "height": ("INT", {"default": 48, "min": 0, "max": 4096, "step": 1}),
            "font_size": ("INT", {"default": 32, "min": 0, "max": 4096, "step": 1}),
            "font_color": ("STRING", {"default": "white"}),
            "label_color": ("STRING", {"default": "black"}),
            "font": (folder_paths.get_filename_list("kjnodes_fonts"), ),
            "text": ("STRING", {"default": "Text"}),
            "direction": (
            [   'up',
                'down',
            ],
            {
            "default": 'up'
             }),
            },
            "optional":{
                "caption": ("STRING", {"default": "", "forceInput": True}),
            }
            }
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "addlabel"
    CATEGORY = "KJNodes/text"
    DESCRIPTION = """
Creates a new with the given text, and concatenates it to  
either above or below the input image.  
Note that this changes the input image's height!  
Fonts are loaded from this folder:  
ComfyUI/custom_nodes/ComfyUI-KJNodes/fonts
"""
        
    def addlabel(self, image, text_x, text_y, text, height, font_size, font_color, label_color, font, direction, caption=""):
        batch_size = image.shape[0]
        width = image.shape[2]
        
        if font == "TTNorms-Black.otf":
            font_path = os.path.join(script_directory, "fonts", "TTNorms-Black.otf")
        else:
            font_path = folder_paths.get_full_path("kjnodes_fonts", font)
        
        if caption == "":
            label_image = Image.new("RGB", (width, height), label_color)
            draw = ImageDraw.Draw(label_image)
            font = ImageFont.truetype(font_path, font_size)
            try:
                draw.text((text_x, text_y), text, font=font, fill=font_color, features=['-liga'])
            except:
                draw.text((text_x, text_y), text, font=font, fill=font_color)

            label_image = np.array(label_image).astype(np.float32) / 255.0
            label_image = torch.from_numpy(label_image)[None, :, :, :]
            # Duplicate the label image for the entire batch
            label_batch = label_image.repeat(batch_size, 1, 1, 1)
        else:
            label_list = []
            assert len(caption) == batch_size, "Number of captions does not match number of images"
            for cap in caption:
                label_image = Image.new("RGB", (width, height), label_color)
                draw = ImageDraw.Draw(label_image)
                font = ImageFont.truetype(font_path, font_size)
                try:
                    draw.text((text_x, text_y), cap, font=font, fill=font_color, features=['-liga'])
                except:
                    draw.text((text_x, text_y), cap, font=font, fill=font_color)

                label_image = np.array(label_image).astype(np.float32) / 255.0
                label_image = torch.from_numpy(label_image)
                label_list.append(label_image)
            label_batch = torch.stack(label_list)
            print(label_batch.shape)

        if direction == 'down':
            combined_images = torch.cat((image, label_batch), dim=1)
        elif direction == 'up':
            combined_images = torch.cat((label_batch, image), dim=1)
        
        return (combined_images,)

```
