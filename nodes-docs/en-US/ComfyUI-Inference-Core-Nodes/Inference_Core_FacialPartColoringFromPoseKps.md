---
tags:
- Animation
---

# [Inference.Core] Colorize Facial Parts from PoseKPS
## Documentation
- Class name: `Inference_Core_FacialPartColoringFromPoseKps`
- Category: `ControlNet Preprocessors/Pose Keypoint Postprocess`
- Output node: `False`

This node is designed to colorize specific facial parts in pose keypoint data, utilizing customizable colors for each facial part. It processes pose keypoint frames to visually enhance and distinguish different facial regions based on the provided keypoint data and color specifications.
## Input types
### Required
- **`pose_kps`**
    - The pose keypoint data containing information about the positions of various facial parts. It serves as the primary input for generating colorized facial keypoints.
    - Comfy dtype: `POSE_KEYPOINT`
    - Python dtype: `List[Dict]`
- **`mode`**
    - Specifies the drawing mode for keypoints, allowing for either point-based or polygon-based rendering of facial parts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`skin`**
    - Specifies the color for the skin facial part, affecting the visual representation of the skin area in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`left_eye`**
    - Specifies the color for the left eye, affecting how the left eye is visualized in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`right_eye`**
    - Specifies the color for the right eye, affecting how the right eye is visualized in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`nose`**
    - Specifies the color for the nose, affecting how the nose is visualized in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`upper_lip`**
    - Specifies the color for the upper lip, affecting how the upper lip is visualized in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`inner_mouth`**
    - Specifies the color for the inner mouth, affecting how the inner mouth is visualized in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`lower_lip`**
    - Specifies the color for the lower lip, affecting how the lower lip is visualized in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor representation of the pose frames with facial parts colorized according to the specified colors.
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
            facial_kps = rearrange(np.array(person["face_keypoints_2d"]), "(n c) -> n c", n=n, c=3)[:, :2] * (width, height)
            facial_kps = facial_kps.astype(np.int32)
            part_color = ImageColor.getrgb(facial_part_colors[part_name])[:3]
            if mode == "circle":
                start, end = FACIAL_PART_RANGES[part_name]
                part_contours = facial_kps[start:end+1]
                for pt in part_contours:
                    cv2.circle(canvas, pt, radius=2, color=part_color, thickness=-1)
                continue

            if part_name not in ["upper_lip", "inner_mouth", "lower_lip"]:
                start, end = FACIAL_PART_RANGES[part_name]
                part_contours = facial_kps[start:end+1]
                if part_name == "skin":
                    part_contours[17:] = part_contours[17:][::-1]
            else:
                part_contours = facial_kps[FACIAL_PART_RANGES[part_name], :]
            cv2.fillPoly(canvas, pts=[part_contours], color=part_color)
        return canvas

```
