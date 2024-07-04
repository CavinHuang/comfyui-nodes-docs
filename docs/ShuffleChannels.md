
# Documentation
- Class name: `ShuffleChannels`
- Category: `image/filters`
- Output node: `False`

ShuffleChannels节点旨在操作图像的颜色通道。它允许重新分配颜色通道，包括红色、绿色、蓝色，以及可选的alpha通道，将它们映射到不同的颜色值或常量值。这一功能可用于创造各种视觉效果或纠正图像中的颜色通道错位。

# Input types
## Required
- **`image`**
    - 待处理的输入图像。该图像的颜色通道将根据指定的映射进行重排。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`red`**
    - 指定输出图像中红色通道的映射。它可以映射到另一个颜色通道或设置为常量值。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`green`**
    - 指定输出图像中绿色通道的映射。它可以映射到另一个颜色通道或设置为常量值。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`blue`**
    - 指定输出图像中蓝色通道的映射。它可以映射到另一个颜色通道或设置为常量值。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alpha`**
    - 可选参数，指定输出图像中alpha（透明度）通道的映射。它可以映射到另一个通道，设置为常量值，或保持不变。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`

# Output types
- **`image`**
    - 根据指定映射重排颜色通道后的输出图像。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ShuffleChannels:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "red": (Channel_List, {"default": "red"}),
                "green": (Channel_List, {"default": "green"}),
                "blue": (Channel_List, {"default": "blue"}),
                "alpha": (Alpha_List, {"default": "none"}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "shuffle"

    CATEGORY = "image/filters"

    def shuffle(self, image, red, green, blue, alpha):
        ch = 3 if alpha == "none" else 4
        t = torch.zeros((image.shape[0], image.shape[1], image.shape[2], ch), dtype=image.dtype, device=image.device)
        image_copy = image.detach().clone()
        
        ch_key = [red, green, blue, alpha]
        for i in range(ch):
            if ch_key[i] == "white":
                t[:,:,:,i] = 1
            elif ch_key[i] == "red":
                t[:,:,:,i] = image_copy[:,:,:,0]
            elif ch_key[i] == "green":
                t[:,:,:,i] = image_copy[:,:,:,1]
            elif ch_key[i] == "blue":
                t[:,:,:,i] = image_copy[:,:,:,2]
            elif ch_key[i] == "alpha":
                if image.shape[3] > 3:
                    t[:,:,:,i] = image_copy[:,:,:,3]
                else:
                    t[:,:,:,i] = 1
        
        return(t,)

```
