---
tags:
- BackgroundRemoval
- Image
---

# Image Remove Bg
## Documentation
- Class name: `easy imageRemBg`
- Category: `EasyUse/Image`
- Output node: `True`

This node is designed to remove the background from images, offering a straightforward way for users to process images by isolating the foreground from the background. It supports different removal modes to accommodate various use cases and image types.
## Input types
### Required
- **`images`**
    - The images from which the background should be removed. This input is crucial for determining the subject matter and executing the background removal process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`rem_mode`**
    - Specifies the mode of background removal to be used, such as 'RMBG-1.4'. This affects the algorithm and technique applied for background removal, tailoring the process to the specific needs of the input images.
    - Comfy dtype: `['RMBG-1.4']`
    - Python dtype: `str`
- **`image_output`**
    - Determines how the output images are handled, such as whether they are saved, hidden, or displayed. This parameter influences the node's output behavior, affecting the visibility and storage of the processed images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_prefix`**
    - A prefix added to the filenames of saved images, providing a way to organize and identify processed images easily.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after background removal, with the foreground preserved and the background made transparent or removed.
    - Python dtype: `Image`
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask generated during the background removal process, indicating areas of the image that were identified as foreground.
    - Python dtype: `Image`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imageRemBg:
  @classmethod
  def INPUT_TYPES(self):
    return {
      "required": {
        "images": ("IMAGE",),
        "rem_mode": (("RMBG-1.4",),),
        "image_output": (["Hide", "Preview", "Save", "Hide/Save"], {"default": "Preview"}),
        "save_prefix": ("STRING", {"default": "ComfyUI"}),
      },
      "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
    }

  RETURN_TYPES = ("IMAGE", "MASK")
  RETURN_NAMES = ("image", "mask")
  FUNCTION = "remove"
  OUTPUT_NODE = True

  CATEGORY = "EasyUse/Image"

  def remove(self, rem_mode, images, image_output, save_prefix, prompt=None, extra_pnginfo=None):
    if rem_mode == "RMBG-1.4":
      # load model
      model_url = REMBG_MODELS[rem_mode]['model_url']
      suffix = model_url.split(".")[-1]
      model_path = get_local_filepath(model_url, REMBG_DIR, rem_mode+'.'+suffix)

      net = BriaRMBG()
      device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
      net.load_state_dict(torch.load(model_path, map_location=device))
      net.to(device)
      net.eval()
      # prepare input
      model_input_size = [1024, 1024]
      new_images = list()
      masks = list()
      for image in images:
        orig_im = tensor2pil(image)
        w, h = orig_im.size
        image = preprocess_image(orig_im, model_input_size).to(device)
        # inference
        result = net(image)
        result_image = postprocess_image(result[0][0], (h, w))
        mask_im = Image.fromarray(result_image)
        new_im = Image.new("RGBA", mask_im.size, (0,0,0,0))
        new_im.paste(orig_im, mask=mask_im)

        new_images.append(pil2tensor(new_im))
        masks.append(pil2tensor(mask_im))

      new_images = torch.cat(new_images, dim=0)
      masks = torch.cat(masks, dim=0)


      results = easySave(new_images, save_prefix, image_output, prompt, extra_pnginfo)

      if image_output in ("Hide", "Hide/Save"):
        return {"ui": {},
                "result": (new_images, masks)}

      return {"ui": {"images": results},
              "result": (new_images, masks)}

    else:
      return (None, None)

```
