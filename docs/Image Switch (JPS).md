
# Documentation
- Class name: Image Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False

Image Switch (JPS)节点旨在根据给定的选择索引从多个输入图像中选择并输出一个。它实现了动态的图像路由功能，使条件性图像处理路径成为可能。

# Input types
## Required
- select
    - select参数决定要输出哪一个输入图像，基于其数值索引。它对控制图像在节点中的流动至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- img_i
    - 代表一系列可选的输入图像（从img_1到img_5），可供选择输出。具体选择哪个图像由select参数决定。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE

# Output types
- img_out
    - 基于select参数选择的输出图像。它通过动态路由其中一个输入图像，实现了条件性图像处理。
    - Comfy dtype: IMAGE
    - Python dtype: IMAGE


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Image_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("img_out",)
    FUNCTION = "get_image"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "img_1": ("IMAGE",),
                "img_2": ("IMAGE",),
                "img_3": ("IMAGE",),
                "img_4": ("IMAGE",),
                "img_5": ("IMAGE",),
            }
        }

    def get_image(self,select,img_1,img_2=None,img_3=None,img_4=None,img_5=None,):
        
        img_out = img_1

        if (select == 2):
            img_out = img_2
        elif (select == 3):
            img_out  = img_3
        elif (select == 4):
            img_out = img_4
        elif (select == 5):
            img_out = img_5

        return (img_out,)

```
