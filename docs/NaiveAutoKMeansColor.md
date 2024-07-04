
# Documentation
- Class name: `NaiveAutoKMeansColor`
- Category: `Bmad/CV/Color A.`
- Output node: `False`

NaiveAutoKMeansColor节点专为自动确定图像K均值聚类的最佳颜色数量而设计，无需用户指定颜色数量。它通过逐步增加聚类数量来迭代应用K均值聚类，直到满足特定条件为止，从而简化了图像颜色量化的过程。

# Input types
## Required
- image
    - 待处理的输入图像，用于颜色量化。该节点对此图像应用K均值聚类，以找到最佳的颜色数量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- max_k
    - K均值聚类考虑的最大聚类数。此参数为算法尝试量化的颜色数量设置上限。
    - Comfy dtype: INT
    - Python dtype: int
- rc_threshold
    - 聚类相对紧密度的阈值，用于判断当前聚类数是否最优。它有助于识别紧密度图中的"拐点"，该拐点表示最有效的聚类数，平衡了细节保留和计算效率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_iterations
    - 每次K均值聚类尝试的最大迭代次数。此参数有助于控制算法的计算复杂度。
    - Comfy dtype: INT
    - Python dtype: int
- eps
    - 收敛的epsilon值。如果质心的变化小于此值，算法将停止，表示已收敛。此参数对于确定算法何时充分最小化了簇内方差至关重要，从而影响颜色量化的精度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过处理的图像，反映了K均值聚类算法确定的最佳颜色数量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- int
    - 算法确定的最佳颜色数量。
    - Comfy dtype: INT
    - Python dtype: int


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
