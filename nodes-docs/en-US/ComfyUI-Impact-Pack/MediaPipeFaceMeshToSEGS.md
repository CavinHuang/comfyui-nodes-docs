---
tags:
- MediaPipeFaceMesh
- Segmentation
---

# MediaPipe FaceMesh to SEGS
## Documentation
- Class name: `MediaPipeFaceMeshToSEGS`
- Category: `ImpactPack/Operation`
- Output node: `False`

The MediaPipeFaceMeshToSEGS node transforms facial landmarks detected by MediaPipe's FaceMesh into a structured format suitable for SEGS (Segmentation and Geometry Schema), enabling further manipulation and analysis of facial features within the SEGS framework.
## Input types
### Required
- **`image`**
    - The input image on which facial landmark detection is performed. It serves as the basis for generating the SEGS representation of facial features.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`crop_factor`**
    - Determines the extent to which the detected facial region is cropped. A higher value results in a tighter crop around the facial landmarks, affecting the final SEGS output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_fill`**
    - Specifies how the bounding box around detected facial landmarks is filled, influencing the appearance and structure of the resulting SEGS.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`crop_min_size`**
    - Sets the minimum size for the cropped facial region, ensuring that the output SEGS does not fall below a certain spatial resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`drop_size`**
    - Defines the threshold below which detected facial regions are disregarded, preventing the generation of SEGS for insignificantly small facial features.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`dilation`**
    - Applies a dilation operation to the facial landmarks' bounding box, expanding its size and potentially including additional context in the SEGS output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`face`**
    - Indicates whether the face region should be included in the SEGS output, allowing for specific facial feature analysis.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`mouth`**
    - Determines whether the mouth region is included in the SEGS, enabling detailed examination and manipulation of this specific area.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`left_eyebrow`**
    - Specifies the inclusion of the left eyebrow in the SEGS output, facilitating focused analysis on this facial feature.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`left_eye`**
    - Controls the inclusion of the left eye in the SEGS, allowing for targeted manipulation and study of eye-related aspects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`left_pupil`**
    - Determines the inclusion of the left pupil in the SEGS, enabling precise analysis and adjustments to this specific part of the eye.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`right_eyebrow`**
    - Specifies the inclusion of the right eyebrow in the SEGS output, facilitating focused analysis on this facial feature.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`right_eye`**
    - Controls the inclusion of the right eye in the SEGS, allowing for targeted manipulation and study of eye-related aspects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`right_pupil`**
    - Determines the inclusion of the right pupil in the SEGS, enabling precise analysis and adjustments to this specific part of the eye.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output is a structured SEGS representation of the detected facial landmarks, ready for further processing and analysis within the SEGS framework.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MediaPipeFaceMeshToSEGS:
    @classmethod
    def INPUT_TYPES(s):
        bool_true_widget = ("BOOLEAN", {"default": True, "label_on": "Enabled", "label_off": "Disabled"})
        bool_false_widget = ("BOOLEAN", {"default": False, "label_on": "Enabled", "label_off": "Disabled"})
        return {"required": {
                                "image": ("IMAGE",),
                                "crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 100, "step": 0.1}),
                                "bbox_fill": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                                "crop_min_size": ("INT", {"min": 10, "max": MAX_RESOLUTION, "step": 1, "default": 50}),
                                "drop_size": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 1, "default": 1}),
                                "dilation": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                                "face": bool_true_widget,
                                "mouth": bool_false_widget,
                                "left_eyebrow": bool_false_widget,
                                "left_eye": bool_false_widget,
                                "left_pupil": bool_false_widget,
                                "right_eyebrow": bool_false_widget,
                                "right_eye": bool_false_widget,
                                "right_pupil": bool_false_widget,
                             },
                # "optional": {"reference_image_opt": ("IMAGE", ), }
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, image, crop_factor, bbox_fill, crop_min_size, drop_size, dilation, face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil):
        # padding is obsolete now
        # https://github.com/Fannovel16/comfyui_controlnet_aux/blob/1ec41fceff1ee99596445a0c73392fd91df407dc/utils.py#L33
        # def calc_pad(h_raw, w_raw):
        #     resolution = normalize_size_base_64(h_raw, w_raw)
        #
        #     def pad64(x):
        #         return int(np.ceil(float(x) / 64.0) * 64 - x)
        #
        #     k = float(resolution) / float(min(h_raw, w_raw))
        #     h_target = int(np.round(float(h_raw) * k))
        #     w_target = int(np.round(float(w_raw) * k))
        #
        #     return pad64(h_target), pad64(w_target)

        # if reference_image_opt is not None:
        #     if image.shape[1:] != reference_image_opt.shape[1:]:
        #         scale_by1 = reference_image_opt.shape[1] / image.shape[1]
        #         scale_by2 = reference_image_opt.shape[2] / image.shape[2]
        #         scale_by = min(scale_by1, scale_by2)
        #
        #         # padding is obsolete now
        #         # h_pad, w_pad = calc_pad(reference_image_opt.shape[1], reference_image_opt.shape[2])
        #         # if h_pad != 0:
        #         #     # height padded
        #         #     image = image[:, :-h_pad, :, :]
        #         # elif w_pad != 0:
        #         #     # width padded
        #         #     image = image[:, :, :-w_pad, :]
        #
        #         image = nodes.ImageScaleBy().upscale(image, "bilinear", scale_by)[0]

        result = core.mediapipe_facemesh_to_segs(image, crop_factor, bbox_fill, crop_min_size, drop_size, dilation, face, mouth, left_eyebrow, left_eye, left_pupil, right_eyebrow, right_eye, right_pupil)
        return (result, )

```
