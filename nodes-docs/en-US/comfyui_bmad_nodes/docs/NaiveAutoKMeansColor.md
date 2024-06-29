---
tags:
- Color
---

# NaiveAutoKMeansColor
## Documentation
- Class name: `NaiveAutoKMeansColor`
- Category: `Bmad/CV/Color A.`
- Output node: `False`

This node is designed to automatically determine the optimal number of colors for K-means clustering on an image, without requiring the user to specify the number of colors. It iteratively applies K-means clustering with increasing numbers of clusters until a certain criteria is met, simplifying the process of color quantization for images.
## Input types
### Required
- **`image`**
    - The input image to be processed for color quantization. The node applies K-means clustering to this image to find the optimal number of colors.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`max_k`**
    - The maximum number of clusters to consider for K-means clustering. This parameter sets an upper limit on the number of colors the algorithm will attempt to quantify.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rc_threshold`**
    - A threshold for the relative compactness of clusters, used to decide if the current number of clusters is optimal. It helps in identifying the 'elbow' in the compactness graph, which signifies the most efficient number of clusters, balancing detail preservation and computational efficiency.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_iterations`**
    - The maximum number of iterations to perform for each K-means clustering attempt. This parameter helps to control the computational complexity of the algorithm.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`eps`**
    - The epsilon value for convergence. If the change in centroids is less than this value, the algorithm will stop, indicating convergence. This parameter is crucial for determining when the algorithm has sufficiently minimized within-cluster variance, thus affecting the precision of the color quantization.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image reflecting the optimal number of colors determined by the K-means clustering algorithm.
    - Python dtype: `torch.Tensor`
- **`int`**
    - Comfy dtype: `INT`
    - The optimal number of colors determined by the algorithm.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class NaiveAutoKMeansColor:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "max_k": ("INT", {"default": 8, "min": 3, "max": 16}),

            # besides looking like the elbow,
            #  a k's compactness divided the by first computed compactness should be below this value
            "rc_threshold": ("FLOAT", {"default": .5, "max": 1, "min": 0.01, "step": 0.01}),

            "max_iterations": ("INT", {"default": 100}),
            "eps": ("FLOAT", {"default": .2, "step": 0.05})
        }}

    RETURN_TYPES = ("IMAGE", "INT")
    FUNCTION = "get_colors"
    CATEGORY = "Bmad/CV/Color A."

    def get_colors(self, image, max_k, rc_threshold, max_iterations, eps):
        image = tensor2opencv(image, 3)
        pixels = image.reshape(-1, 3)
        pixels = np.float32(pixels)

        def normalize(vector):
            return vector / np.linalg.norm(vector)

        def compute_angle_at_k(prev_k_c, k_c, next_k_c):
            p_km1 = np.array([-1, prev_k_c, 0])
            p_k = np.array([0, k_c, 0])
            p_kp1 = np.array([1, next_k_c, 0])
            v1 = normalize(p_km1 - p_k)
            v2 = normalize(p_kp1 - p_k)
            return np.arccos(np.clip(np.dot(v1, v2), -1.0, 1.0))

        # define criteria
        criteria = (cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER, max_iterations, eps)

        # compute k means and check for the elbow
        #  here the elbow is the edgiest point on the compactness graph
        best_angle = 7  # max is pi, when the line is perfectly straight; and the objective is to minimize the angle
        max_c = best_rc = best_k = None
        current_k_data = prev_k_data = best_k_data = None
        for k in range(1, max_k + 2):
            next_k_data = cv.kmeans(pixels, k, None, criteria, 10, cv.KMEANS_RANDOM_CENTERS)

            if max_c is None:
                max_c = next_k_data[0]

            if next_k_data[0] == 0:
                # if it is a perfect fit, leave the method
                # avoids unneeded computation, and division by zero on k = 1
                best_k_data = next_k_data
                best_k = k
                break

            if k > 2:
                rc = current_k_data[0] / max_c
                angle = compute_angle_at_k(prev_k_data[0] / max_c, rc, next_k_data[0] / max_c)
                if angle < best_angle or best_rc > rc_threshold:
                    best_angle = angle
                    best_k_data = current_k_data
                    best_rc = rc
                    best_k = k - 1

            prev_k_data = current_k_data
            current_k_data = next_k_data

        # convert back into uint8, and make original image
        center = np.uint8(best_k_data[2])
        res = center[best_k_data[1].flatten()]
        res2 = res.reshape((image.shape))
        res2 = opencv2tensor(res2)
        return (res2, best_k)

```
