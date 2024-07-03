
# Documentation
- Class name: MaskOuterBlur
- Category: Bmad/CV/Misc
- Output node: False

MaskOuterBlur节点是一个专门用于高级图像处理的工具，主要功能是对图像中遮罩外部区域应用模糊效果。它利用CPU和GPU的性能优势实现高效处理，并支持多种内核大小和形状以达到所需的模糊效果。这个节点在需要选择性模糊处理以提升图像视觉质量或出于隐私和美学原因遮蔽特定部分的场景中特别有用。

# Input types
## Required
- src
    - 需要处理的源图像。它作为应用遮罩和后续模糊效果的基础，在整个转换过程中起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- mask
    - 指定图像中需要模糊处理的区域的遮罩。这个遮罩决定了模糊效果将应用的区域，实现图像的选择性模糊。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- kernel_size
    - 指定用于模糊操作的内核大小。内核大小影响模糊效果的强度和扩散范围。
    - Comfy dtype: INT
    - Python dtype: int
- paste_src
    - 一个可选参数，允许将原始源图像粘贴回模糊后的图像上，从而在同一图像中实现模糊区域和清晰区域的组合。
    - Comfy dtype: BOOLEAN
    - Python dtype: numpy.ndarray

# Output types
- image
    - 对指定区域应用模糊效果后的结果图像。根据遮罩和paste_src参数的设置，这个图像可能包含模糊和清晰的区域组合。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskOuterBlur:  # great, another "funny" name; what would you call this?
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
                "mask": ("IMAGE",),
                "kernel_size": ("INT", {"default": 16, "min": 2, "max": 150, "step": 2}),
                "paste_src": ("BOOLEAN", {"default": True})
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "compute"
    CATEGORY = "Bmad/CV/Misc"

    def compute(self, src, mask, kernel_size, paste_src):
        from comfy.model_management import is_nvidia

        # setup input data
        kernel_size += 1
        image = tensor2opencv(src, 3)
        mask = tensor2opencv(mask, 1)

        # setup kernel ( maybe add optional input later for custom kernel? )
        kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, (kernel_size, kernel_size))
        kernel = np.where(kernel > 0, 1, 0)

        #  resize mask if it's size doesn't match the image's
        if image.shape[0:2] != mask.shape[0:2]:
            print("MaskedOuterBlur node will resize mask to fit the image.")
            mask = cv.resize(mask, (image.shape[1], image.shape[0]), interpolation=cv.INTER_LINEAR)

        # extend image borders so that the algorithm doesn't have to take them into account
        border_size = kernel_size // 2
        image_extended = cv.copyMakeBorder(image, border_size, border_size, border_size, border_size,
                                           cv.BORDER_REPLICATE)
        mask_extended = cv.copyMakeBorder(mask, border_size, border_size, border_size, border_size, cv.BORDER_REPLICATE)

        # convert the image to float32
        image_float32 = image_extended.astype('float32')
        mask_float32 = mask_extended.astype('float32')

        if is_nvidia():  # is this check legit?
            import cupy as cp
            from numba.cuda import get_current_device
            from .utils.mask_outer_blur import blur_cuda

            # setup cupy arrays
            image_cupy = cp.asarray(image_float32)
            mask_cupy = cp.asarray(mask_float32)
            # note: don't pass extended size here; more data than needed to retrieve from gpu.
            #       instead, rawkernel outputs the final directly with the kernel size in mind
            #       and there is no need to crop after the computation
            out = cp.zeros((mask.shape[0], mask.shape[1], 3), dtype=cp.float32)
            kernel_gpu = cp.asarray(kernel)

            # setup grid/block sizes
            gpu = get_current_device()
            w, h = mask.shape[1], mask.shape[0]
            blockDimx, blockDimy = np.floor(np.array([w / h, h / w]) * gpu.MAX_THREADS_PER_BLOCK ** (1 / 2)).astype(
                np.int32)
            gridx, gridy = np.ceil(np.array([w / blockDimx, h / blockDimy])).astype(np.int32)

            # run on gpu, and then fetch result as numpy array
            blur_cuda((gridx, gridy), (blockDimx, blockDimy),
                      (image_cupy, mask_cupy, out, kernel_gpu, kernel_size, mask_extended.shape[1],
                       mask_extended.shape[0]))
            result_float32 = cp.asnumpy(out)

        else:  # run on cpu
            from .utils.mask_outer_blur import blur_cpu
            result_float32 = blur_cpu(image_float32, mask_float32, kernel, kernel_size, mask_extended.shape[1],
                                      mask_extended.shape[0])
            # remove added borders ( this is not required in gpu version;
            #                        only done here to avoid computing two sets of coordinates for every pixel )
            result_float32 = result_float32[border_size:-border_size, border_size:-border_size, :]

        if paste_src:  # paste src onto result using mask
            indices = mask > 0
            result_float32[indices, :] = image[indices, :]

        result = opencv2tensor(result_float32)
        return (result,)

```
