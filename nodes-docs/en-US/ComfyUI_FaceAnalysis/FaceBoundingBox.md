---
tags:
- BoundingBox
- Image
- ImageTransformation
---

# Face Bounding Box
## Documentation
- Class name: `FaceBoundingBox`
- Category: `FaceAnalysis`
- Output node: `False`

The FaceBoundingBox node is designed to detect and extract the bounding boxes of faces within an image. It utilizes analysis models to identify faces and calculate their bounding box coordinates, optionally adjusting for padding to ensure the entire face is captured.
## Input types
### Required
- **`analysis_models`**
    - Specifies the models and libraries used for face detection, impacting the accuracy and method of bounding box calculation.
    - Comfy dtype: `ANALYSIS_MODELS`
    - Python dtype: `dict`
- **`image`**
    - The input image in which faces are to be detected and their bounding boxes calculated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image or torch.Tensor`
- **`padding`**
    - An optional padding value to expand the bounding boxes, ensuring the entire face is captured without being too close to the edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`index`**
    - Optionally specifies the index of a specific face to focus on, with a default value that processes all detected faces.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The cropped image of the detected face, adjusted according to the specified padding and index.
    - Python dtype: `torch.Tensor`
- **`x`**
    - Comfy dtype: `INT`
    - The x-coordinate of the top-left corner of the face bounding box.
    - Python dtype: `int`
- **`y`**
    - Comfy dtype: `INT`
    - The y-coordinate of the top-left corner of the face bounding box.
    - Python dtype: `int`
- **`width`**
    - Comfy dtype: `INT`
    - The width of the face bounding box.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the face bounding box.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FaceBoundingBox:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "analysis_models": ("ANALYSIS_MODELS", ),
                "image": ("IMAGE", ),
                "padding": ("INT", { "default": 0, "min": 0, "max": 4096, "step": 1 }),
                "index": ("INT", { "default": -1, "min": -1, "max": 4096, "step": 1 }),
            },
        }

    RETURN_TYPES = ("IMAGE", "INT", "INT", "INT", "INT")
    RETURN_NAMES = ("IMAGE", "x", "y", "width", "height")
    FUNCTION = "bbox"
    CATEGORY = "FaceAnalysis"
    OUTPUT_IS_LIST = (True, True, True, True, True,)

    def bbox(self, analysis_models, image, padding, index=-1):
        out_img = []
        out_x = []
        out_y = []
        out_w = []
        out_h = []

        for i in image:
            img = T.ToPILImage()(i.permute(2, 0, 1)).convert('RGB')

            if analysis_models["library"] == "insightface":
                faces = analysis_models["detector"].get(np.array(img))
                for face in faces:
                    x, y, w, h = face.bbox.astype(int)
                    w = w - x
                    h = h - y
                    x = max(0, x - padding)
                    y = max(0, y - padding)
                    w = min(img.width, w + 2 * padding)
                    h = min(img.height, h + 2 * padding)
                    crop = img.crop((x, y, x + w, y + h))
                    out_img.append(T.ToTensor()(crop).permute(1, 2, 0).unsqueeze(0))
                    out_x.append(x)
                    out_y.append(y)
                    out_w.append(w)
                    out_h.append(h)

            else:
                faces = analysis_models["detector"](np.array(img), 1)
                for face in faces:
                    x, y, w, h = face.left(), face.top(), face.width(), face.height()
                    x = max(0, x - padding)
                    y = max(0, y - padding)
                    w = min(img.width, w + 2 * padding)
                    h = min(img.height, h + 2 * padding)
                    crop = img.crop((x, y, x + w, y + h))
                    out_img.append(T.ToTensor()(crop).permute(1, 2, 0).unsqueeze(0))
                    out_x.append(x)
                    out_y.append(y)
                    out_w.append(w)
                    out_h.append(h)

        if not out_img:
            raise Exception('No face detected in image.')

        if len(out_img) == 1:
            index = 0

        if index > len(out_img) - 1:
            index = len(out_img) - 1

        if index != -1:
            out_img = [out_img[index]]
            out_x = [out_x[index]]
            out_y = [out_y[index]]
            out_w = [out_w[index]]
            out_h = [out_h[index]]
        #else:
        #    w = out_img[0].shape[1]
        #    h = out_img[0].shape[0]

            #out_img = [comfy.utils.common_upscale(img.unsqueeze(0).movedim(-1,1), w, h, "bilinear", "center").movedim(1,-1).squeeze(0) for img in out_img]
            #out_img = torch.stack(out_img)
        
        return (out_img, out_x, out_y, out_w, out_h,)

```
