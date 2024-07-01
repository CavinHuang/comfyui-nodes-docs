# Documentation
- Class name: `Film Interpolation (mtb)`
- Category: `mtb/frame iterpolation`
- Output node: `False`

Film Interpolation (mtb)节点利用Google Research的FILM技术进行帧插值，特别设计用于处理帧间的大幅运动。它提供了一种在一系列图像之间插入额外帧的方法，增强视频内容的流畅性和平滑度。

## Input types
### Required
- **`images`**
    - 要进行插值的图像张量。此输入对于确定插值发生的帧之间至关重要，直接影响输出的视觉连续性。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`interpolate`**
    - 指定在每对输入帧之间插值的帧数的整数。此参数直接影响结果运动的平滑度和持续时间。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`film_model`**
    - 用于插值的FILM模型实例。该模型负责实际计算插值帧，利用先进技术有效管理大幅运动。
    - Comfy dtype: `FILM_MODEL`
    - Python dtype: `interpolator.Interpolator`

## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - 输出是插值图像的张量，增加了额外的帧以在原始图像之间创建更平滑的过渡。
    - Python dtype: `torch.Tensor`

## Usage tips
- Infra type: `GPU`
- Common nodes: unknown

## Source code
```python
class MTB_FilmInterpolation:
    """Google Research FILM frame interpolation for large motion"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "interpolate": ("INT", {"default": 2, "min": 1, "max": 50}),
                "film_model": ("FILM_MODEL",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "do_interpolation"
    CATEGORY = "mtb/frame iterpolation"

    def do_interpolation(
        self,
        images: torch.Tensor,
        interpolate: int,
        film_model: interpolator.Interpolator,
    ):
        n = images.size(0)
        # check if images is an empty tensor and return it...
        if n == 0:
            return (images,)

        # check if tensorflow GPU is available
        available_gpus = tf.config.list_physical_devices("GPU")
        if not len(available_gpus):
            log.warning(
                "Tensorflow GPU not available, falling back to CPU this will be very slow"
            )
        else:
            log.debug(f"Tensorflow GPU available, using {available_gpus}")

        num_frames = (n - 1) * (2 ** (interpolate) - 1)
        log.debug(f"Will interpolate into {num_frames} frames")

        in_frames = [images[i] for i in range(n)]
        out_tensors = []

        pbar = comfy.utils.ProgressBar(num_frames)

        for frame in util.interpolate_recursively_from_memory(
            in_frames, interpolate, film_model
        ):
            out_tensors.append(
                torch.from_numpy(frame)
                if isinstance(frame, np.ndarray)
                else frame
            )
            model_management.throw_exception_if_processing_interrupted()
            pbar.update(1)

        out_tensors = torch.cat(
            [tens.unsqueeze(0) for tens in out_tensors], dim=0
        )

        log.debug(f"Returning {len(out_tensors)} tensors")
        log.debug(f"Output shape {out_tensors.shape}")
        log.debug(f"Output type {out_tensors.dtype}")
        return (out_tensors,)
```