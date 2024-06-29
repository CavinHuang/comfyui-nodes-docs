---
tags:
- Animation
---

# Colorize Facial Parts from PoseKPS
## Documentation
- Class name: `FacialPartColoringFromPoseKps`
- Category: `ControlNet Preprocessors/Pose Keypoint Postprocess`
- Output node: `False`

This node is designed to colorize specific facial parts in pose keypoints data, allowing for visual differentiation and analysis of facial features based on pose estimation. It utilizes facial keypoints to draw or fill specified parts with colors, supporting customization of part colors and rendering modes.
## Input types
### Required
- **`pose_kps`**
    - The pose keypoints data, which includes positions of various facial and body keypoints for one or more individuals. This data is essential for determining the facial parts to be colorized.
    - Comfy dtype: `POSE_KEYPOINT`
    - Python dtype: `List[Dict]`
- **`mode`**
    - Specifies the rendering mode for the facial parts, either as points or filled polygons, affecting the visual representation of the colorized keypoints.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`skin`**
    - Specifies the color for the skin facial part.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`left_eye`**
    - Specifies the color for the left eye facial part.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`right_eye`**
    - Specifies the color for the right eye facial part.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`nose`**
    - Specifies the color for the nose facial part.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`upper_lip`**
    - Specifies the color for the upper lip facial part.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`inner_mouth`**
    - Specifies the color for the inner mouth facial part.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`lower_lip`**
    - Specifies the color for the lower lip facial part.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image(s) with facial parts colorized according to the provided specifications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FacialPartColoringFromPoseKps:
    @classmethod
    def INPUT_TYPES(s):
        input_types = {
            "required": {"pose_kps": ("POSE_KEYPOINT",), "mode": (["point", "polygon"], {"default": "polygon"})}
        }
        for facial_part in FACIAL_PARTS: 
            input_types["required"][facial_part] = ("STRING", {"default": LAPA_COLORS[facial_part], "multiline": False})
        return input_types
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "colorize"
    CATEGORY = "ControlNet Preprocessors/Pose Keypoint Postprocess"
    def colorize(self, pose_kps, mode, **facial_part_colors):
        pose_frames = pose_kps
        np_frames = [self.draw_kps(pose_frame, mode, **facial_part_colors) for pose_frame in pose_frames]
        np_frames = np.stack(np_frames, axis=0)
        return (torch.from_numpy(np_frames).float() / 255.,)
            
    def draw_kps(self, pose_frame, mode, **facial_part_colors):
        width, height = pose_frame["canvas_width"], pose_frame["canvas_height"]
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        for person, part_name in itertools.product(pose_frame["people"], FACIAL_PARTS):
            n = len(person["face_keypoints_2d"]) // 3
            facial_kps = rearrange(np.array(person["face_keypoints_2d"]), "(n c) -> n c", n=n, c=3)[:, :2]
            if is_normalized(facial_kps):
                facial_kps *= (width, height)
            facial_kps = facial_kps.astype(np.int32)
            part_color = ImageColor.getrgb(facial_part_colors[part_name])[:3]
            part_contours = facial_kps[FACIAL_PART_RANGES[part_name], :]
            if mode == "point":
                for pt in part_contours:
                    cv2.circle(canvas, pt, radius=2, color=part_color, thickness=-1)
            else:
                cv2.fillPoly(canvas, pts=[part_contours], color=part_color)
        return canvas

```
