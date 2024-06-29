---
tags:
- Color
---

# ImageQuantize
## Documentation
- Class name: `ImageQuantize`
- Category: `image/postprocessing`
- Output node: `False`

The ImageQuantize node is designed to reduce the number of colors in an image to a specified number, optionally applying dithering techniques to maintain visual quality. This process is useful for creating palette-based images or reducing the color complexity for certain applications.
## Input types
### Required
- **`image`**
    - The input image tensor to be quantized. It affects the node's execution by being the primary data upon which color reduction is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`colors`**
    - Specifies the number of colors to reduce the image to. It directly influences the quantization process by determining the color palette size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`dither`**
    - Determines the dithering technique to be applied during quantization, affecting the visual quality and appearance of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The quantized version of the input image, with reduced color complexity and optionally dithered to maintain visual quality.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Quantize:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "colors": ("INT", {
                    "default": 256,
                    "min": 1,
                    "max": 256,
                    "step": 1
                }),
                "dither": (["none", "floyd-steinberg", "bayer-2", "bayer-4", "bayer-8", "bayer-16"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "quantize"

    CATEGORY = "image/postprocessing"

    def bayer(im, pal_im, order):
        def normalized_bayer_matrix(n):
            if n == 0:
                return np.zeros((1,1), "float32")
            else:
                q = 4 ** n
                m = q * normalized_bayer_matrix(n - 1)
                return np.bmat(((m-1.5, m+0.5), (m+1.5, m-0.5))) / q

        num_colors = len(pal_im.getpalette()) // 3
        spread = 2 * 256 / num_colors
        bayer_n = int(math.log2(order))
        bayer_matrix = torch.from_numpy(spread * normalized_bayer_matrix(bayer_n) + 0.5)

        result = torch.from_numpy(np.array(im).astype(np.float32))
        tw = math.ceil(result.shape[0] / bayer_matrix.shape[0])
        th = math.ceil(result.shape[1] / bayer_matrix.shape[1])
        tiled_matrix = bayer_matrix.tile(tw, th).unsqueeze(-1)
        result.add_(tiled_matrix[:result.shape[0],:result.shape[1]]).clamp_(0, 255)
        result = result.to(dtype=torch.uint8)

        im = Image.fromarray(result.cpu().numpy())
        im = im.quantize(palette=pal_im, dither=Image.Dither.NONE)
        return im

    def quantize(self, image: torch.Tensor, colors: int, dither: str):
        batch_size, height, width, _ = image.shape
        result = torch.zeros_like(image)

        for b in range(batch_size):
            im = Image.fromarray((image[b] * 255).to(torch.uint8).numpy(), mode='RGB')

            pal_im = im.quantize(colors=colors) # Required as described in https://github.com/python-pillow/Pillow/issues/5836

            if dither == "none":
                quantized_image = im.quantize(palette=pal_im, dither=Image.Dither.NONE)
            elif dither == "floyd-steinberg":
                quantized_image = im.quantize(palette=pal_im, dither=Image.Dither.FLOYDSTEINBERG)
            elif dither.startswith("bayer"):
                order = int(dither.split('-')[-1])
                quantized_image = Quantize.bayer(im, pal_im, order)

            quantized_array = torch.tensor(np.array(quantized_image.convert("RGB"))).float() / 255
            result[b] = quantized_array

        return (result,)

```
