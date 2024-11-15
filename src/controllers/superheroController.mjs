import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroes,
  buscarSuperheroePorAtributo,
  obtenerSuperheroesMayoresDe30,
  agregarSuperHeroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  eliminarSuperheroePorNombre,
} from "../services/superheroService.mjs";
import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../../views/responsiveView.mjs";

export async function obtenerSuperheroePorIdController(req, res, next) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    return superheroe
      ? res.send(renderizarSuperheroe(superheroe))
      : res.status(404).send({ mensaje: "Superhéroe no encontrado" });
  } catch (error) {
    return next(error);
  }
}

export async function obtenerTodosLosSuperheroesController(req, res, next) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    return res.render("dashboard", { superheroes });
  } catch (error) {
    return next(error);
  }
}

export async function buscarSuperheroePorAtributoController(req, res, next) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroePorAtributo(atributo, valor);
    return res.send(renderizarListaSuperheroes(superheroes));
  } catch (error) {
    return next(error);
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res, next) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    return res.send(renderizarListaSuperheroes(superheroes));
  } catch (error) {
    return next(error);
  }
}

export async function mostrarAddSuperheroController(req, res, next) {
  try {
    return await res.render("addSuperhero");
  } catch (error) {
    next(error);
  }
}

export async function agregarNuevoSuperheroeController(req, res, next) {
  try {
    const superHeroData = req.body;
    const newSuperHero = await agregarSuperHeroe(superHeroData);
    return res.status(201).send(renderizarSuperheroe(newSuperHero));
    // res.redirect('/api/heroes');
  } catch (error) {
    return next(error);
  }
}

export async function mostrarEditSuperheroController(req, res, next) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    return superheroe
      ? await res.render("editSuperhero", { superheroe })
      : res.status(404).send({ mensaje: "Superhéroe no encontrado" });
  } catch (error) {
    next(error);
  }
}

export async function actualizarSuperheroePorIdController(req, res, next) {
  try {
    const { id } = req.params;
    const superHeroData = req.body;
    await actualizarSuperheroe(id, superHeroData);
    return res.status(200).json({ message: "Superhéroe actualizado" });
  } catch (error) {
    return next(error);
  }
}

export async function eliminarSuperheroePorIdController(req, res, next) {
  const { id } = req.params;
  try {
    await eliminarSuperheroe(id);
    return res.status(204).json({ message: "Superhéroe eliminado" });
  } catch (error) {
    return next(error);
  }
}

export async function eliminarSuperheroePorNombreController(req, res, next) {
  const { nombreSuperHeroe } = req.params;
  try {
    await eliminarSuperheroePorNombre(nombreSuperHeroe);
    return res.status(204).json({ message: "Superhéroe eliminado" });
  } catch (error) {
    return next(error);
  }
}