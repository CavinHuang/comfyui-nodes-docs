
# Documentation
- Class name: `Remap`
- Category: `Bmad/CV/Transform`
- Output node: `False`

Remap节点设计用于通过应用特定的重映射操作来转换图像。它作为更专门的重映射操作的基础类，比如调整透视或以各种方式扭曲图像以实现所需的视觉效果。

# Input types
## Required
- **`remap`**
    - 指定要应用的重映射操作，包括转换所需的函数和参数。它对于定义图像将如何被改变至关重要。
    - Comfy dtype: `REMAP`
    - Python dtype: `Dict[str, Any]`
- **`src`**
    - 要转换的源图像。它是应用重映射操作的主要输入。
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`interpolation`**
    - 定义重映射过程中使用的插值方法，影响输出图像的质量和外观。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `int`
## Optional
- **`src_mask`**
    - 一个可选的掩码，可以应用于源图像，允许基于掩码的覆盖范围进行选择性重映射。
    - Comfy dtype: `MASK`
    - Python dtype: `numpy.ndarray`
- **`output_with_alpha`**
    - 指示输出图像是否应包含alpha通道，允许透明效果。
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`

# Output types
- **`image`**
    - 应用重映射操作后得到的转换图像。
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`mask`**
    - 重映射过程中生成的掩码，对应于源图像的转换区域。
    - Comfy dtype: `MASK`
    - Python dtype: `numpy.ndarray`


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Remap:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "remap": ("REMAP", {"forceInput": True}),
            "src": ("IMAGE",),
            "interpolation": (interpolation_types, {"default": interpolation_types[2]}),
        },
            "optional": {
                "src_mask": ("MASK",),
                "output_with_alpha": ("BOOLEAN", {"default": False})
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    FUNCTION = "transform"
    CATEGORY = "Bmad/CV/Transform"

    def transform(self, src, remap, interpolation, src_mask=None, output_with_alpha=False):
        src = tensor2opencv(src)
        dst_dims = remap["dims"] if "dims" in remap else src.shape[:2]
        func = remap["func"]
        xargs = remap["xargs"]
        # if src_mask is not defined set it to a blank canvas; otherwise, just unwrap it
        src_mask = np.ones(src.shape[:2]) * 255 if src_mask is None else tensor2opencv(src_mask, 1)

        if "custom" not in remap.keys():
            # generic application, using cv.remap
            xs, ys, bb = func(src, *xargs)
            remap_img = cv.remap(src, xs, ys, interpolation_types_map[interpolation])
            mask = cv.remap(src_mask, xs, ys, interpolation_types_map[interpolation])
        else:
            # non-generic application; replaces cv.remap w/ some other function.
            # so far only for user provided homography,
            #  to avoid a separate node, since technically it is also a remap and also uses the interpolation argument.
            custom_data = func(src, *xargs)
            remap_img, mask, bb = remap["custom"](custom_data, src, interpolation_types_map[interpolation], src_mask)

        if bb is not None:
            new_img = np.zeros((*dst_dims, 3))  # hope width and height are not swapped
            new_img[bb[1]:bb[3], bb[0]:bb[2], :] = remap_img
            remap_img = new_img
            new_img = np.zeros(dst_dims)  # was working previously without the batch dim; unsure if really needed
            new_img[bb[1]:bb[3], bb[0]:bb[2]] = mask
            mask = new_img

        if output_with_alpha:
            new_img = np.zeros((*dst_dims, 4))
            new_img[:, :, 0:3] = remap_img[:, :, :]
            new_img[:, :, 3] = mask[:, :]
            remap_img = new_img

        return (opencv2tensor(remap_img), opencv2tensor(mask))

```
