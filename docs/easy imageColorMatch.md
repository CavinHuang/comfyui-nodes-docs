
# Documentation
- Class name: easy imageColorMatch
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy imageColorMatch节点旨在调整目标图像的配色方案，使其与参考图像相匹配。它支持多种颜色匹配方法，并允许通过保存选项和前缀来自定义输出。这个节点在需要不同图像之间保持色调一致性的场景中特别有用，比如照片编辑、图形设计和内容创作等。

# Input types
## Required
- image_ref
    - 作为颜色匹配标准的参考图像。它为目标图像的颜色调整提供了基准。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_target
    - 需要调整以匹配参考图像配色方案的目标图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- method
    - 指定要使用的颜色匹配方法。它决定了调整目标图像颜色的算法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- image_output
    - 控制节点的输出行为，允许隐藏、预览或保存处理后的图像等选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_prefix
    - 保存文件名的前缀，提供了一种简单组织和识别处理后图像的方法。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 处理后的图像，其配色方案已调整以匹配参考图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ui
    - 提供用户界面组件（如适用），用于显示或与处理后的图像交互。


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imageColorMatch(PreviewImage):
  @classmethod
  def INPUT_TYPES(cls):
    return {
      "required": {
        "image_ref": ("IMAGE",),
        "image_target": ("IMAGE",),
        "method": (['wavelet', 'adain', 'mkl', 'hm', 'reinhard', 'mvgd', 'hm-mvgd-hm', 'hm-mkl-hm'],),
        "image_output": (["Hide", "Preview", "Save", "Hide/Save"], {"default": "Preview"}),
        "save_prefix": ("STRING", {"default": "ComfyUI"}),
      },
      "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
    }

  CATEGORY = "EasyUse/Image"

  RETURN_TYPES = ("IMAGE",)
  RETURN_NAMES = ("image",)
  OUTPUT_NODE = True
  FUNCTION = "color_match"

  def color_match(self, image_ref, image_target, method, image_output, save_prefix, prompt=None, extra_pnginfo=None):
    if method in ["wavelet", "adain"]:
      result_images = wavelet_color_fix(tensor2pil(image_target), tensor2pil(image_ref)) if method == 'wavelet' else adain_color_fix(tensor2pil(image_target), tensor2pil(image_ref))
      new_images = pil2tensor(result_images)
    else:
      try:
        from color_matcher import ColorMatcher
      except:
        install_package("color-matcher")
        from color_matcher import ColorMatcher
      image_ref = image_ref.cpu()
      image_target = image_target.cpu()
      batch_size = image_target.size(0)
      out = []
      images_target = image_target.squeeze()
      images_ref = image_ref.squeeze()

      image_ref_np = images_ref.numpy()
      images_target_np = images_target.numpy()
      if image_ref.size(0) > 1 and image_ref.size(0) != batch_size:
        raise ValueError("ColorMatch: Use either single reference image or a matching batch of reference images.")
      cm = ColorMatcher()
      for i in range(batch_size):
        image_target_np = images_target_np if batch_size == 1 else images_target[i].numpy()
        image_ref_np_i = image_ref_np if image_ref.size(0) == 1 else images_ref[i].numpy()
        try:
          image_result = cm.transfer(src=image_target_np, ref=image_ref_np_i, method=method)
        except BaseException as e:
          print(f"Error occurred during transfer: {e}")
          break
        out.append(torch.from_numpy(image_result))

      new_images = torch.stack(out, dim=0).to(torch.float32)

    results = easySave(new_images, save_prefix, image_output, prompt, extra_pnginfo)

    if image_output in ("Hide", "Hide/Save"):
      return {"ui": {},
              "result": (new_images,)}

    return {"ui": {"images": results},
            "result": (new_images,)}

```
