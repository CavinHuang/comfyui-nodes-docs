---
tags:
- Batch
- Image
---

# Batch Shake (mtb)
## Documentation
- Class name: `Batch Shake (mtb)`
- Category: `mtb/batch`
- Output node: `False`

The Batch Shake node applies a dynamic shaking effect to a batch of images, utilizing parameters such as position, rotation, and frequency to simulate motion or instability effects.
## Input types
### Required
- **`images`**
    - The batch of images to be processed. This input is crucial for defining the visual content that will undergo the shaking effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`position_amount_x`**
    - Determines the horizontal intensity of the shaking effect, affecting how far images can move along the x-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`position_amount_y`**
    - Determines the vertical intensity of the shaking effect, affecting how far images can move along the y-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rotation_amount`**
    - Controls the amount of rotation applied to the images, simulating a twisting motion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frequency`**
    - Defines the frequency of the shaking effect, influencing the speed of motion changes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frequency_divider`**
    - Modifies the base frequency, allowing for finer control over the shaking effect's speed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`octaves`**
    - Adjusts the complexity of the shaking pattern, adding layers of motion for a more nuanced effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - Sets the initial seed for random number generation, ensuring reproducible shaking patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image after applying the shaking effect.
    - Python dtype: `Image`
- **`pos_x`**
    - Comfy dtype: `FLOATS`
    - The horizontal translation values applied to each image in the batch.
    - Python dtype: `List[float]`
- **`pos_y`**
    - Comfy dtype: `FLOATS`
    - The vertical translation values applied to each image in the batch.
    - Python dtype: `List[float]`
- **`rot`**
    - Comfy dtype: `FLOATS`
    - The rotation values applied to each image in the batch, reflecting the degree of twist.
    - Python dtype: `List[float]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchShake:
    """Applies a shaking effect to batches of images."""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "position_amount_x": ("FLOAT", {"default": 1.0}),
                "position_amount_y": ("FLOAT", {"default": 1.0}),
                "rotation_amount": ("FLOAT", {"default": 10.0}),
                "frequency": ("FLOAT", {"default": 1.0, "min": 0.005}),
                "frequency_divider": ("FLOAT", {"default": 1.0, "min": 0.005}),
                "octaves": ("INT", {"default": 1, "min": 1}),
                "seed": ("INT", {"default": 0}),
            },
        }

    RETURN_TYPES = ("IMAGE", "FLOATS", "FLOATS", "FLOATS")
    RETURN_NAMES = ("image", "pos_x", "pos_y", "rot")
    FUNCTION = "apply_shake"
    CATEGORY = "mtb/batch"

    # def interpolant(self, t):
    # return t * t * t * (t * (t * 6 - 15) + 10)

    def generate_perlin_noise_2d(
        self, shape, res, tileable=(False, False), interpolant=None
    ):
        """Generate a 2D numpy array of perlin noise.

        Args:
            shape: The shape of the generated array (tuple of two ints).
                This must be a multple of res.
            res: The number of periods of noise to generate along each
                axis (tuple of two ints). Note shape must be a multiple of
                res.
            tileable: If the noise should be tileable along each axis
                (tuple of two bools). Defaults to (False, False).
            interpolant: The interpolation function, defaults to
                t*t*t*(t*(t*6 - 15) + 10).

        Returns
        -------
            A numpy array of shape shape with the generated noise.

        Raises
        ------
            ValueError: If shape is not a multiple of res.
        """
        interpolant = interpolant or DEFAULT_INTERPOLANT
        delta = (res[0] / shape[0], res[1] / shape[1])
        d = (shape[0] // res[0], shape[1] // res[1])
        grid = (
            np.mgrid[0 : res[0] : delta[0], 0 : res[1] : delta[1]].transpose(
                1, 2, 0
            )
            % 1
        )
        # Gradients
        angles = 2 * np.pi * np.random.rand(res[0] + 1, res[1] + 1)
        gradients = np.dstack((np.cos(angles), np.sin(angles)))
        if tileable[0]:
            gradients[-1, :] = gradients[0, :]
        if tileable[1]:
            gradients[:, -1] = gradients[:, 0]
        gradients = gradients.repeat(d[0], 0).repeat(d[1], 1)
        g00 = gradients[: -d[0], : -d[1]]
        g10 = gradients[d[0] :, : -d[1]]
        g01 = gradients[: -d[0], d[1] :]
        g11 = gradients[d[0] :, d[1] :]
        # Ramps
        n00 = np.sum(np.dstack((grid[:, :, 0], grid[:, :, 1])) * g00, 2)
        n10 = np.sum(np.dstack((grid[:, :, 0] - 1, grid[:, :, 1])) * g10, 2)
        n01 = np.sum(np.dstack((grid[:, :, 0], grid[:, :, 1] - 1)) * g01, 2)
        n11 = np.sum(
            np.dstack((grid[:, :, 0] - 1, grid[:, :, 1] - 1)) * g11, 2
        )
        # Interpolation
        t = interpolant(grid)
        n0 = n00 * (1 - t[:, :, 0]) + t[:, :, 0] * n10
        n1 = n01 * (1 - t[:, :, 0]) + t[:, :, 0] * n11
        return np.sqrt(2) * ((1 - t[:, :, 1]) * n0 + t[:, :, 1] * n1)

    def generate_fractal_noise_2d(
        self,
        shape,
        res,
        octaves=1,
        persistence=0.5,
        lacunarity=2,
        tileable=(True, True),
        interpolant=None,
    ):
        """Generate a 2D numpy array of fractal noise.

        Args:
            shape: The shape of the generated array (tuple of two ints).
                This must be a multiple of lacunarity**(octaves-1)*res.
            res: The number of periods of noise to generate along each
                axis (tuple of two ints). Note shape must be a multiple of
                (lacunarity**(octaves-1)*res).
            octaves: The number of octaves in the noise. Defaults to 1.
            persistence: The scaling factor between two octaves.
            lacunarity: The frequency factor between two octaves.
            tileable: If the noise should be tileable along each axis
                (tuple of two bools). Defaults to (True,True).
            interpolant: The, interpolation function, defaults to
                t*t*t*(t*(t*6 - 15) + 10).

        Returns
        -------
            A numpy array of fractal noise and of shape shape generated by
            combining several octaves of perlin noise.

        Raises
        ------
            ValueError: If shape is not a multiple of
                (lacunarity**(octaves-1)*res).
        """
        interpolant = interpolant or DEFAULT_INTERPOLANT

        noise = np.zeros(shape)
        frequency = 1
        amplitude = 1
        for _ in range(octaves):
            noise += amplitude * self.generate_perlin_noise_2d(
                shape,
                (frequency * res[0], frequency * res[1]),
                tileable,
                interpolant,
            )
            frequency *= lacunarity
            amplitude *= persistence
        return noise

    def fbm(self, x, y, octaves):
        # noise_2d = self.generate_fractal_noise_2d((256, 256), (8, 8), octaves)
        # Now, extract a single noise value based on x and y, wrapping indices if necessary
        x_idx = int(x) % 256
        y_idx = int(y) % 256
        return self.noise_pattern[x_idx, y_idx]

    def apply_shake(
        self,
        images,
        position_amount_x,
        position_amount_y,
        rotation_amount,
        frequency,
        frequency_divider,
        octaves,
        seed,
    ):
        # Rehash
        np.random.seed(seed)
        self.position_offset = np.random.uniform(-1e3, 1e3, 3)
        self.rotation_offset = np.random.uniform(-1e3, 1e3, 3)
        self.noise_pattern = self.generate_perlin_noise_2d(
            (512, 512), (32, 32), (True, True)
        )

        # Assuming frame count is derived from the first dimension of images tensor
        frame_count = images.shape[0]

        frequency = frequency / frequency_divider

        # Generate shaking parameters for each frame
        x_translations = []
        y_translations = []
        rotations = []

        for frame_num in range(frame_count):
            time = frame_num * frequency
            x_idx = (self.position_offset[0] + frame_num) % 256
            y_idx = (self.position_offset[1] + frame_num) % 256

            np_position = np.array(
                [
                    self.fbm(x_idx, time, octaves),
                    self.fbm(y_idx, time, octaves),
                ]
            )

            # np_position = np.array(
            #     [
            #         self.fbm(self.position_offset[0] + frame_num, time, octaves),
            #         self.fbm(self.position_offset[1] + frame_num, time, octaves),
            #     ]
            # )
            # np_rotation = self.fbm(self.rotation_offset[2] + frame_num, time, octaves)

            rot_idx = (self.rotation_offset[2] + frame_num) % 256
            np_rotation = self.fbm(rot_idx, time, octaves)

            x_translations.append(np_position[0] * position_amount_x)
            y_translations.append(np_position[1] * position_amount_y)
            rotations.append(np_rotation * rotation_amount)

        # Convert lists to tensors
        # x_translations = torch.tensor(x_translations, dtype=torch.float32)
        # y_translations = torch.tensor(y_translations, dtype=torch.float32)
        # rotations = torch.tensor(rotations, dtype=torch.float32)

        # Create an instance of Batch2dTransform
        transform = MTB_Batch2dTransform()

        log.debug(
            f"Applying shaking with parameters: \nposition {position_amount_x}, {position_amount_y}\nrotation {rotation_amount}\nfrequency {frequency}\noctaves {octaves}"
        )

        # Apply shaking transformations to images
        shaken_images = transform.transform_batch(
            images,
            border_handling="edge",  # Assuming edge handling as default
            constant_color="#000000",  # Assuming black as default constant color
            x=x_translations,
            y=y_translations,
            angle=rotations,
        )[0]

        return (shaken_images, x_translations, y_translations, rotations)

```
