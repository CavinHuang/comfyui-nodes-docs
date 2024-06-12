---
tags:
- Contour
- Image
---

# Contours
## Documentation
- Class name: `Contours`
- Category: `Bmad/CV/Contour`
- Output node: `False`

The `Contours` node is designed to identify and extract contours from an image based on specified retrieval and approximation modes. It transforms the input image into a grayscale version, applies thresholding if necessary, and utilizes OpenCV's contour finding capabilities to return the identified contours along with their hierarchy.
## Input types
### Required
- **`image`**
    - The input image from which contours are to be extracted. This image is crucial as it serves as the basis for contour detection, directly influencing the contours that are identified and their characteristics.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`retrieval_mode`**
    - Specifies the contour retrieval mode, which determines how the contours are organized or retrieved. This choice impacts the structure of the output contours, affecting how they are hierarchically related or grouped.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`approximation_mode`**
    - Defines the method used to approximate the contours. Different modes can simplify the contour shapes in various ways, affecting the level of detail and the overall shape of the extracted contours.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`cv_contours`**
    - Comfy dtype: `CV_CONTOURS`
    - A list of detected contours in the image, representing the primary output of contour detection.
    - Python dtype: `List[torch.Tensor]`
- **`cv_contour`**
    - Comfy dtype: `CV_CONTOUR`
    - A single contour selected from the list of detected contours, based on specific criteria or processing steps.
    - Python dtype: `torch.Tensor`
- **`cv_contours_hierarchy`**
    - Comfy dtype: `CV_CONTOURS_HIERARCHY`
    - The hierarchical representation of contours, indicating the relationship between contour levels. This hierarchy provides insight into the nesting and organization of contours within the image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Contours:
    """
    Note:
    The image is converted to grey, but no threshold is applied.
    Apply the thresholding before using and feed a black and white image.
    """

    approximation_modes_map = {
        'CHAIN_APPROX_NONE': cv.CHAIN_APPROX_NONE,
        'CHAIN_APPROX_SIMPLE': cv.CHAIN_APPROX_SIMPLE,
        'CHAIN_APPROX_TC89_L1': cv.CHAIN_APPROX_TC89_L1,
        'CHAIN_APPROX_TC89_KCOS': cv.CHAIN_APPROX_TC89_KCOS
    }
    approximation_modes = list(approximation_modes_map.keys())

    retrieval_modes_map = {
        'RETR_EXTERNAL': cv.RETR_EXTERNAL,
        'RETR_LIST': cv.RETR_LIST,
        'RETR_CCOMP': cv.RETR_CCOMP,
        'RETR_TREE': cv.RETR_TREE,
        'RETR_FLOODFILL': cv.RETR_FLOODFILL
    }
    retrieval_modes = list(retrieval_modes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "retrieval_mode": (s.retrieval_modes, {"default": "RETR_LIST"}),
                "approximation_mode": (s.approximation_modes, {"default": "CHAIN_APPROX_SIMPLE"}),
            },
        }

    RETURN_TYPES = ("CV_CONTOURS", "CV_CONTOUR", "CV_CONTOURS_HIERARCHY")
    FUNCTION = "find_contours"
    CATEGORY = "Bmad/CV/Contour"
    OUTPUT_IS_LIST = (False, True, False)

    def find_contours(self, image, retrieval_mode, approximation_mode):
        image = tensor2opencv(image)
        thresh = cv.cvtColor(image, cv.COLOR_RGB2GRAY)

        # no thresh applied here, non zeroes are treated as 1 according to documentation;
        # thresh should have been already applied to the image, before passing it to this node.

        contours, hierarchy = cv.findContours(
            thresh,
            self.retrieval_modes_map[retrieval_mode],
            self.approximation_modes_map[approximation_mode])

        return (contours, contours, hierarchy,)

```
