
# Documentation
- Class name: GLIGENTextBoxApplyBatch
- Category: KJNodes/experimental
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GLIGENTextBoxApplyBatch节点是用于批量处理文本框应用的节点，可以高效地在多个图像或帧中应用文本叠加或修改。这个节点简化了向图像添加文本的过程，特别适合需要在一系列图像中应用一致文本元素的场景，如视频帧或相关图像集合。

# Input types
## Required
- conditioning_to
    - 指定将应用文本框修改的目标条件数据，作为文本叠加过程的基础。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- latents
    - 提供批次中图像的潜在表示，用作应用文本框修改的基础。
    - Comfy dtype: LATENT
    - Python dtype: list
- clip
    - 表示用于编码文本输入的CLIP模型，有助于生成应用于图像的基于文本的特征。
    - Comfy dtype: CLIP
    - Python dtype: object
- gligen_textbox_model
    - 指定用于生成文本框叠加的模型，实现图像文本的自定义和应用。
    - Comfy dtype: GLIGEN
    - Python dtype: object
- text
    - 允许指定要在整个图像批次中应用的文本内容，作为文本叠加或修改的主要内容。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 定义文本框叠加的宽度，允许根据图像自定义叠加大小。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定文本框叠加的高度，可以精确控制叠加尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- coordinates
    - 提供文本框叠加的定位信息，决定文本将应用在图像的哪个位置。
    - Comfy dtype: STRING
    - Python dtype: tuple
- interpolation
    - 确定文本框应用的插值方法，影响文本叠加在图像上的平滑度和混合效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- conditioning
    - 反映应用文本框叠加后修改的条件数据，将文本修改整合到条件框架中。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- image
    - 展示应用了文本框叠加的最终图像，展示对图像批次所做的视觉修改。
    - Comfy dtype: IMAGE
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GLIGENTextBoxApplyBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning_to": ("CONDITIONING", ),
                              "latents": ("LATENT", ),
                              "clip": ("CLIP", ),
                              "gligen_textbox_model": ("GLIGEN", ),
                              "text": ("STRING", {"multiline": True}),
                              "width": ("INT", {"default": 64, "min": 8, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 64, "min": 8, "max": MAX_RESOLUTION, "step": 8}),
                              "coordinates": ("STRING", {"multiline": True}),
                              "interpolation": (
                                [   
                                    'straight',
                                    'CubicSpline',
                                ],
                                {
                                "default": 'CubicSpline'
                                 }),
                             }}
    RETURN_TYPES = ("CONDITIONING", "IMAGE",)
    FUNCTION = "append"
    CATEGORY = "KJNodes/experimental"
    DESCRIPTION = """
Experimental, does not function yet as ComfyUI base changes are needed
"""

    def append(self, latents, conditioning_to, clip, gligen_textbox_model, text, width, height, coordinates, interpolation):

        coordinates_dict = parse_coordinates(coordinates)
        batch_size = sum(tensor.size(0) for tensor in latents.values())
        c = []
        cond, cond_pooled = clip.encode_from_tokens(clip.tokenize(text), return_pooled=True)

        # Interpolate coordinates for the entire batch
        if interpolation == 'CubicSpline':
            interpolated_coords = interpolate_coordinates_with_curves(coordinates_dict, batch_size)
        if interpolation == 'straight':
            interpolated_coords = interpolate_coordinates(coordinates_dict, batch_size)

        plot_image_tensor = plot_to_tensor(coordinates_dict, interpolated_coords, 512, 512, height)
        for t in conditioning_to:
            n = [t[0], t[1].copy()]
            
            position_params_batch = [[] for _ in range(batch_size)]  # Initialize a list of empty lists for each batch item
            
            for i in range(batch_size):
                x_position, y_position = interpolated_coords[i] 
                position_param = (cond_pooled, height // 8, width // 8, y_position // 8, x_position // 8)
                position_params_batch[i].append(position_param)  # Append position_param to the correct sublist
                print("x ",x_position, "y ", y_position)
            prev = []
            if "gligen" in n[1]:
                prev = n[1]['gligen'][2]
            else:
                prev = [[] for _ in range(batch_size)]
            # Concatenate prev and position_params_batch, ensuring both are lists of lists
            # and each sublist corresponds to a batch item
            combined_position_params = [prev_item + batch_item for prev_item, batch_item in zip(prev, position_params_batch)]
            n[1]['gligen'] = ("position", gligen_textbox_model, combined_position_params)
            c.append(n)
        
        return (c, plot_image_tensor,)

```
