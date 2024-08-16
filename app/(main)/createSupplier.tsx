'use client';

import { useReducer, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getUser } from '@/lib/dal';

type State = {
    name: string;
    website: string;
    range: { min: number; max: number };
    shipsTo: string[];
    tags: {
        averageMainProductPrice: number;
        searchVolume: number;
        mapCompliance: boolean;
        directToConsumerSales: boolean;
        productTypesOffered: string[];
    };
};

type Action =
    | { type: 'SET_FIELD'; field: string; value: any }
    | { type: 'SET_TAGS_FIELD'; field: string; value: any }
    | { type: 'SET_RANGE_FIELD'; field: string; value: number };

const initialState: State = {
    name: '',
    website: '',
    range: { min: 0, max: 0 },
    shipsTo: [],
    tags: {
        averageMainProductPrice: 0,
        searchVolume: 0,
        mapCompliance: false,
        directToConsumerSales: false,
        productTypesOffered: [],
    },
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_TAGS_FIELD':
            return {
                ...state,
                tags: { ...state.tags, [action.field]: action.value },
            };
        case 'SET_RANGE_FIELD':
            return {
                ...state,
                range: { ...state.range, [action.field]: action.value },
            };
        default:
            return state;
    }
}

export default function CreateSupplier() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>();
    const router = useRouter();
    useEffect(() => {
        const user = async () => {
            return await getUser();
        }
        const data = user().then((data) => {
            setIsAdmin(data?.isAdmin);
        })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/supplier', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        });

        if (response.ok) {
            router.replace('/')
            toast("Created supplier successfully");

        } else {
            console.error('Failed to create supplier');
        }
    };

    if (isAdmin === null) {
        return <p>Loading...</p>;
    }

    if (!isAdmin) {
        return <p>Unauthorized</p>;
    }
    return (
        <form onSubmit={handleSubmit} className="container mx-auto flex flex-col justify-center items-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={state.name}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Website</label>
                    <input
                        type="url"
                        value={state.website}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'website', value: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Range</label>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            value={state.range.min}
                            onChange={(e) => dispatch({ type: 'SET_RANGE_FIELD', field: 'min', value: Number(e.target.value) })}
                            className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                            placeholder="Min"
                            required
                        />
                        <input
                            type="number"
                            value={state.range.max}
                            onChange={(e) => dispatch({ type: 'SET_RANGE_FIELD', field: 'max', value: Number(e.target.value) })}
                            className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                            placeholder="Max"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Ships To</label>
                    <input
                        type="text"
                        value={state.shipsTo.join(', ')}
                        onChange={(e) =>
                            dispatch({ type: 'SET_FIELD', field: 'shipsTo', value: e.target.value.split(',').map(item => item.trim()) })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        placeholder="Comma separated list"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Average Main Product Price</label>
                    <input
                        type="number"
                        value={state.tags.averageMainProductPrice}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_TAGS_FIELD',
                                field: 'averageMainProductPrice',
                                value: Number(e.target.value),
                            })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Search Volume</label>
                    <input
                        type="number"
                        value={state.tags.searchVolume}
                        onChange={(e) =>
                            dispatch({ type: 'SET_TAGS_FIELD', field: 'searchVolume', value: Number(e.target.value) })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">MAP Compliance</label>
                    <input
                        type="checkbox"
                        checked={state.tags.mapCompliance}
                        onChange={(e) =>
                            dispatch({ type: 'SET_TAGS_FIELD', field: 'mapCompliance', value: e.target.checked })
                        }
                        className="mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Direct-to-Consumer Sales</label>
                    <input
                        type="checkbox"
                        checked={state.tags.directToConsumerSales}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_TAGS_FIELD',
                                field: 'directToConsumerSales',
                                value: e.target.checked,
                            })
                        }
                        className="mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Product Types Offered</label>
                    <input
                        type="text"
                        value={state.tags.productTypesOffered.join(', ')}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_TAGS_FIELD',
                                field: 'productTypesOffered',
                                value: e.target.value.split(',').map(item => item.trim()),
                            })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        placeholder="Comma separated list"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800"
                >
                    Save Supplier
                </button>
            </div>
        </form>
    );
}
