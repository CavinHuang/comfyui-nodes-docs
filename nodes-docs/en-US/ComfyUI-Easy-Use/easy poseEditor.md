---
tags:
- Animation
- PoseEstimation
---

# PoseEditor
## Documentation
- Class name: `easy poseEditor`
- Category: `EasyUse/Image`
- Output node: `False`

The `poseEditor` node is designed to facilitate the editing of poses within images. It provides a framework for adjusting and manipulating the positioning and orientation of subjects in an image, leveraging a set of predefined input types to customize the editing process.
## Input types
### Required
- **`image`**
    - `image` is the primary input for the pose editing process, representing the image within which poses are to be edited or manipulated. It is essential for defining the starting point of the pose adjustment workflow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output `image` is the result of the pose editing process, showcasing the adjusted or manipulated poses within the original image context.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class poseEditor:
  @classmethod
  def INPUT_TYPES(self):
    temp_dir = folder_paths.get_temp_directory()

    if not os.path.isdir(temp_dir):
      os.makedirs(temp_dir)

    temp_dir = folder_paths.get_temp_directory()

    return {"required":
              {"image": (sorted(os.listdir(temp_dir)),)},
            }

  RETURN_TYPES = ("IMAGE",)
  FUNCTION = "output_pose"

  CATEGORY = "EasyUse/Image"

  def output_pose(self, image):
    image_path = os.path.join(folder_paths.get_temp_directory(), image)
    # print(f"Create: {image_path}")

    i = Image.open(image_path)
    image = i.convert("RGB")
    image = np.array(image).astype(np.float32) / 255.0
    image = torch.from_numpy(image)[None,]

    return (image,)

  @classmethod
  def IS_CHANGED(self, image):
    image_path = os.path.join(
      folder_paths.get_temp_directory(), image)
    # print(f'Change: {image_path}')

    m = hashlib.sha256()
    with open(image_path, 'rb') as f:
      m.update(f.read())
    return m.digest().hex()

```
