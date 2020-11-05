import { Response, Request } from 'express';
import database from "../database/connections";
import { csvData } from '../readFile';

export default class ClassesControllers {
    async update (request: Request, response: Response) {
        const { id, description } = request.params;
        const transaction = await database.transaction();

        try {
            await transaction('categories')
                .where('categories.id', id as string)
                .update({ description: description as string });

            transaction.commit();

            return response.status(201).send();
        } catch (reject) {
            await transaction.rollback();
            return response.status(400).json({
                error: 'Unexpected error while updating category'
            });
        }
    }

    async delete (request: Request, response: Response) {
        const { id } = request.params;
        const transaction = await database.transaction();
        try {
            await transaction('categories')
                .where('categories.id', id as string)
                .del();

            transaction.commit();

            return response.status(201).send();
        } catch (reject) {
            await transaction.rollback();
            return response.status(400).json({
                error: 'Unexpected error while deleting category'
            });
        }
    }

    async index (request: Request, response: Response) {
        const categories = await database('categories');

        return response.json(categories);
    }

    async create (request: Request, response: Response) {
        const { id, description } = request.body;
    
        const transaction = await database.transaction();
    
        try {
            await transaction('categories').insert({
                id,
                description,
            });
        
            transaction.commit();
    
            return response.status(201).send();
        } catch (reject) {
            await transaction.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new category'
            });
        }
    }

    async createCsv (request: Request, response: Response) {

        const arrayCSV = csvData;
        const transaction = await database.transaction();
    
        try {
            const array: { id: any; description: any; }[] = [];
            arrayCSV.forEach(element => {
                array.push({
                    id: element[1],
                    description: element[0],
                });
            });

            await transaction('categories').insert(array);
            transaction.commit();
    
            return response.status(201).send();
        } catch (reject) {
            await transaction.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new category'
            });
        }
    }
}